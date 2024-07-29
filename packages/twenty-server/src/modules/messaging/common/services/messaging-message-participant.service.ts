import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EntityManager } from 'typeorm';

import {
  InjectObjectMetadataRepository,
} from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import {
  getFlattenedValuesAndValuesStringForBatchRawQuery,
} from 'src/modules/calendar/utils/get-flattened-values-and-values-string-for-batch-raw-query.util';
import { ObjectRecord } from 'src/engine/workspace-manager/workspace-sync-metadata/types/object-record';
import { MessageParticipantRepository } from 'src/modules/messaging/common/repositories/message-participant.repository';
import {
  MessageParticipantWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-participant.workspace-entity';
import {
  ParticipantWithMessageId,
} from 'src/modules/messaging/message-import-manager/drivers/gmail/types/gmail-message';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import { ClientRepository } from 'src/modules/funnelmink/client.repository';
import {
  AddClientIdAndWorkspaceMemberIdService,
} from 'src/modules/calendar-messaging-participant/services/add-client-id-and-workspace-member-id/add-client-id-and-workspace-member-id.service';

// Todo: this is not the right place for this file. The code needs to be refactored in term of business modules with a precise scope.
// Putting it here to avoid circular dependencies for now.
@Injectable()
export class MessagingMessageParticipantService {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
    @InjectObjectMetadataRepository(MessageParticipantWorkspaceEntity)
    private readonly messageParticipantRepository: MessageParticipantRepository,
    @InjectObjectMetadataRepository(ClientWorkspaceEntity)
    private readonly personRepository: ClientRepository,
    private readonly addPersonIdAndWorkspaceMemberIdService: AddClientIdAndWorkspaceMemberIdService,
    private readonly eventEmitter: EventEmitter2,
  ) {
  }

  public async updateMessageParticipantsAfterPeopleCreation(
    createdPeople: ObjectRecord<ClientWorkspaceEntity>[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<ObjectRecord<MessageParticipantWorkspaceEntity>[]> {
    const participants = await this.messageParticipantRepository.getByHandles(
      createdPeople.map((person) => person.email),
      workspaceId,
      transactionManager,
    );

    if (!participants) return [];

    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const handles = participants.map((participant) => participant.handle);

    const participantPersonIds = await this.personRepository.getByEmails(
      handles,
      workspaceId,
      transactionManager,
    );

    const messageParticipantsToUpdate = participants.map((participant) => ({
      id: participant.id,
      personId: participantPersonIds.find(
        (e: { id: string; email: string }) => e.email === participant.handle,
      )?.id,
    }));

    if (messageParticipantsToUpdate.length === 0) return [];

    const { flattenedValues, valuesString } =
      getFlattenedValuesAndValuesStringForBatchRawQuery(
        messageParticipantsToUpdate,
        {
          id: 'uuid',
          personId: 'uuid',
        },
      );

    return (
      await this.workspaceDataSourceService.executeRawQuery(
        `UPDATE ${dataSourceSchema}."messageParticipant" AS "messageParticipant" SET "personId" = "data"."personId"
      FROM (VALUES ${valuesString}) AS "data"("id", "personId")
      WHERE "messageParticipant"."id" = "data"."id"
      RETURNING *`,
        flattenedValues,
        workspaceId,
        transactionManager,
      )
    ).flat();
  }

  public async saveMessageParticipants(
    participants: ParticipantWithMessageId[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<ObjectRecord<MessageParticipantWorkspaceEntity>[]> {
    if (!participants) return [];

    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const messageParticipantsToSave =
      await this.addPersonIdAndWorkspaceMemberIdService.addClientIdAndWorkspaceMemberId(
        participants,
        workspaceId,
        transactionManager,
      );

    const { flattenedValues, valuesString } =
      getFlattenedValuesAndValuesStringForBatchRawQuery(
        messageParticipantsToSave,
        {
          messageId: 'uuid',
          role: `${dataSourceSchema}."messageParticipant_role_enum"`,
          handle: 'text',
          displayName: 'text',
          personId: 'uuid',
          workspaceMemberId: 'uuid',
        },
      );

    if (messageParticipantsToSave.length === 0) return [];

    return await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}."messageParticipant" ("messageId", "role", "handle", "displayName", "personId", "workspaceMemberId") VALUES ${valuesString} RETURNING *`,
      flattenedValues,
      workspaceId,
      transactionManager,
    );
  }

  public async matchMessageParticipants(
    workspaceId: string,
    email: string,
    personId?: string,
    workspaceMemberId?: string,
  ) {
    const messageParticipantsToUpdate =
      await this.messageParticipantRepository.getByHandles(
        [email],
        workspaceId,
      );

    const messageParticipantIdsToUpdate = messageParticipantsToUpdate.map(
      (participant) => participant.id,
    );

    if (personId) {
      const updatedMessageParticipants =
        await this.messageParticipantRepository.updateParticipantsPersonIdAndReturn(
          messageParticipantIdsToUpdate,
          personId,
          workspaceId,
        );

      this.eventEmitter.emit(`messageParticipant.matched`, {
        workspaceId,
        userId: null,
        messageParticipants: updatedMessageParticipants,
      });
    }
    if (workspaceMemberId) {
      await this.messageParticipantRepository.updateParticipantsWorkspaceMemberId(
        messageParticipantIdsToUpdate,
        workspaceMemberId,
        workspaceId,
      );
    }
  }

  public async unmatchMessageParticipants(
    workspaceId: string,
    handle: string,
    personId?: string,
    workspaceMemberId?: string,
  ) {
    if (personId) {
      await this.messageParticipantRepository.removePersonIdByHandle(
        handle,
        workspaceId,
      );
    }
    if (workspaceMemberId) {
      await this.messageParticipantRepository.removeWorkspaceMemberIdByHandle(
        handle,
        workspaceId,
      );
    }
  }
}
