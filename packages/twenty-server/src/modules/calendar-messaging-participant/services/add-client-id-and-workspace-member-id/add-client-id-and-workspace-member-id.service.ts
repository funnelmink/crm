import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';

import {
  InjectObjectMetadataRepository,
} from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import { ClientRepository } from 'src/modules/funnelmink/client.repository';

@Injectable()
export class AddClientIdAndWorkspaceMemberIdService {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
    @InjectObjectMetadataRepository(ClientWorkspaceEntity)
    private readonly clientRepository: ClientRepository,
  ) {
  }

  private async getEmailClientIdMap(
    handles: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<Map<string, string>> {
    const clientIds = await this.clientRepository.getByEmails(
      handles,
      workspaceId,
      transactionManager,
    );

    return new Map(clientIds.map((client) => [client.email, client.id]));
  }

  private async getEmailWorkspaceMemberIdMap(
    handles: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<Map<string, string>> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const workspaceMemberIds: {
      id: string;
      email: string;
    }[] = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT "workspaceMember"."id", "connectedAccount"."handle" AS email FROM ${dataSourceSchema}."workspaceMember"
              JOIN ${dataSourceSchema}."connectedAccount" ON ${dataSourceSchema}."workspaceMember"."id" = ${dataSourceSchema}."connectedAccount"."accountOwnerId"
              WHERE ${dataSourceSchema}."connectedAccount"."handle" = ANY($1)`,
      [handles],
      workspaceId,
      transactionManager,
    );

    return new Map(
      workspaceMemberIds.map((workspaceMember) => [
        workspaceMember.email,
        workspaceMember.id,
      ]),
    );
  }

  public async addClientIdAndWorkspaceMemberId<T extends { handle: string }>(
    objects: T[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<
    (T & {
      clientId: string | null;
      workspaceMemberId: string | null;
    })[]
  > {
    const handles = objects.map((object) => object.handle);

    const clientIdMap = await this.getEmailClientIdMap(
      handles,
      workspaceId,
      transactionManager,
    );

    const workspaceMemberIdMap = await this.getEmailWorkspaceMemberIdMap(
      handles,
      workspaceId,
      transactionManager,
    );

    return objects.map((object) => ({
      ...object,
      clientId: clientIdMap.get(object.handle) || null,
      workspaceMemberId: workspaceMemberIdMap.get(object.handle) || null,
    }));
  }
}
