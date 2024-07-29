import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import axios, { AxiosInstance } from 'axios';

import {
  getCompanyNameFromDomainName,
} from 'src/modules/calendar-messaging-participant/utils/get-company-name-from-domain-name.util';
import {
  InjectObjectMetadataRepository,
} from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import { ClientRepository } from 'src/modules/funnelmink/client.repository';
import {
  ConnectedAccountWorkspaceEntity,
} from 'src/modules/connected-account/standard-objects/connected-account.workspace-entity';
import { ObjectRecord } from 'src/engine/workspace-manager/workspace-sync-metadata/types/object-record';
import { Contacts } from 'src/modules/connected-account/auto-companies-and-contacts-creation/types/contact.type';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import {
  MessageParticipantWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-participant.workspace-entity';
import {
  CalendarEventParticipantWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-event-participant.workspace-entity';
import { WorkspaceMemberRepository } from 'src/modules/workspace-member/repositories/workspace-member.repository';
import { isWorkEmail } from 'src/utils/is-work-email';
import {
  getDomainNameFromHandle,
} from 'src/modules/calendar-messaging-participant/utils/get-domain-name-from-handle.util';
import {
  CalendarEventParticipantService,
} from 'src/modules/calendar/services/calendar-event-participant/calendar-event-participant.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  MessagingMessageParticipantService,
} from 'src/modules/messaging/common/services/messaging-message-participant.service';
import {
  filterOutContactsFromCompanyOrWorkspace,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/utils/filter-out-contacts-from-company-or-workspace.util';
import {
  getUniqueContactsAndHandles,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/utils/get-unique-contacts-and-handles.util';

@Injectable()
export class CreateClientService {
  private readonly httpService: AxiosInstance;

  constructor(
    @InjectObjectMetadataRepository(ClientWorkspaceEntity)
    private readonly clientRepository: ClientRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
    private readonly messageParticipantService: MessagingMessageParticipantService,
    private readonly calendarEventParticipantService: CalendarEventParticipantService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.httpService = axios.create({
      baseURL: 'https://companies.twenty.com',
    });
  }

  async createClients(
    connectedAccountHandle: string,
    clientsToCreate: Contacts, // Assuming Contacts is now representing Clients
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<ObjectRecord<ClientWorkspaceEntity>[]> {
    if (!clientsToCreate || clientsToCreate.length === 0) {
      return [];
    }

    // TODO: This is a feature that may be implemented in the future
    const isClientAutoCreationForNonWorkEmailsEnabled = false;

    const workspaceMembers =
      await this.workspaceMemberRepository.getAllByWorkspaceId(
        workspaceId,
        transactionManager,
      );

    const clientsToCreateFromOtherSources =
      filterOutContactsFromCompanyOrWorkspace(
        clientsToCreate,
        connectedAccountHandle,
        workspaceMembers,
      );

    const { uniqueContacts, uniqueHandles } = getUniqueContactsAndHandles(
      clientsToCreateFromOtherSources,
    );

    if (uniqueHandles.length === 0) {
      return [];
    }

    const alreadyCreatedClients = await this.clientRepository.getByEmails(
      uniqueHandles,
      workspaceId,
      transactionManager,
    );

    const alreadyCreatedClientEmails: string[] = alreadyCreatedClients?.map(
      ({ email }) => email,
    );

    const filteredClientsToCreate = uniqueContacts.filter(
      (client) =>
        !alreadyCreatedClientEmails.includes(client.handle) &&
        client.handle.includes('@') &&
        (isClientAutoCreationForNonWorkEmailsEnabled ||
          isWorkEmail(client.handle)),
    );

    const formattedClientsToCreate = filteredClientsToCreate.map((client) => ({
      workspaceId: workspaceId,
      handle: client.handle,
      name: client.displayName,
    }));

    return await this.clientRepository.createClients(
      formattedClientsToCreate,
      workspaceId,
      transactionManager,
    );
  }


  async createClient(
    domainName: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<string> {
    const companyId = v4();

    const { name, city } = await this.getCompanyInfoFromDomainName(domainName);

    await this.clientRepository.createClient(
      workspaceId,
      {
        id: companyId,
        domainName,
        name,
        city,
      },
      transactionManager,
    );

    return companyId;
  }

  async getCompanyInfoFromDomainName(domainName: string): Promise<{
    name: string;
    city: string;
  }> {
    try {
      const response = await this.httpService.get(`/${domainName}`);

      const data = response.data;

      return {
        name: data.name ?? getCompanyNameFromDomainName(domainName),
        city: data.city,
      };
    } catch (e) {
      return {
        name: getCompanyNameFromDomainName(domainName),
        city: '',
      };
    }
  }

  async createClientsAndUpdateParticipants(
    connectedAccount: ObjectRecord<ConnectedAccountWorkspaceEntity>,
    contactsToCreate: Contacts,
    workspaceId: string,
  ) {
    const { dataSource: workspaceDataSource } =
      await this.workspaceDataSourceService.connectedToWorkspaceDataSourceAndReturnMetadata(
        workspaceId,
      );

    let updatedMessageParticipants: ObjectRecord<MessageParticipantWorkspaceEntity>[] =
      [];
    let updatedCalendarEventParticipants: ObjectRecord<CalendarEventParticipantWorkspaceEntity>[] =
      [];

    await workspaceDataSource?.transaction(
      async (transactionManager: EntityManager) => {
        const createdPeople = await this.createClients(
          connectedAccount.handle,
          contactsToCreate,
          workspaceId,
          transactionManager,
        );

        updatedMessageParticipants =
          await this.messageParticipantService.updateMessageParticipantsAfterPeopleCreation(
            createdPeople,
            workspaceId,
            transactionManager,
          );

        updatedCalendarEventParticipants =
          await this.calendarEventParticipantService.updateCalendarEventParticipantsAfterPeopleCreation(
            createdPeople,
            workspaceId,
            transactionManager,
          );
      },
    );

    this.eventEmitter.emit(`messageParticipant.matched`, {
      workspaceId,
      userId: connectedAccount.accountOwnerId,
      messageParticipants: updatedMessageParticipants,
    });

    this.eventEmitter.emit(`calendarEventParticipant.matched`, {
      workspaceId,
      userId: connectedAccount.accountOwnerId,
      calendarEventParticipants: updatedCalendarEventParticipants,
    });
  }
}
