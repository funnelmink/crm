import { Injectable } from '@nestjs/common';

import { MessageQueueJob } from 'src/engine/integrations/message-queue/interfaces/message-queue-job.interface';

import { ObjectRecord } from 'src/engine/workspace-manager/workspace-sync-metadata/types/object-record';
import {
  ConnectedAccountWorkspaceEntity,
} from 'src/modules/connected-account/standard-objects/connected-account.workspace-entity';
import {
  CreateClientService,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-client.service';

export type CreateClientJobData = {
  workspaceId: string;
  connectedAccount: ObjectRecord<ConnectedAccountWorkspaceEntity>;
  contactsToCreate: {
    displayName: string;
    handle: string;
  }[];
};

@Injectable()
export class CreateClientJob
  implements MessageQueueJob<CreateClientJobData> {
  constructor(
    private readonly createClientService: CreateClientService,
  ) {
  }

  async handle(data: CreateClientJobData): Promise<void> {
    const { workspaceId, connectedAccount, contactsToCreate } = data;

    await this.createClientService.createClientsAndUpdateParticipants(
      connectedAccount,
      contactsToCreate.map((contact) => ({
        handle: contact.handle,
        displayName: contact.displayName,
      })),
      workspaceId,
    );
  }
}
