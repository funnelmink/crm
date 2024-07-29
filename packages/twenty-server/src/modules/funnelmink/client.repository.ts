import { Injectable } from '@nestjs/common';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { EntityManager } from 'typeorm';
import { ObjectRecord } from 'src/engine/workspace-manager/workspace-sync-metadata/types/object-record';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import {
  getFlattenedValuesAndValuesStringForBatchRawQuery,
} from 'src/modules/calendar/utils/get-flattened-values-and-values-string-for-batch-raw-query.util';
import { v4 } from 'uuid';

export type ClientToCreate = {
  id: string;
  domainName: string;
  name?: string;
  city?: string;
};

@Injectable()
export class ClientRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  public async getExistingClientsByDomainNames(
    domainNames: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<{ id: string; domainName: string }[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT id, "domainName" FROM ${dataSourceSchema}.client WHERE "domainName" = ANY($1)`,
      [domainNames],
      workspaceId,
      transactionManager,
    );
  }

  public async getLastClientPosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.client`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async getByEmails(
    emails: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<ObjectRecord<ClientWorkspaceEntity>[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}.client WHERE email = ANY($1)`,
      [emails],
      workspaceId,
      transactionManager,
    );
  }

  public async createClient(
    workspaceId: string,
    clientToCreate: ClientToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastClientPosition = await this.getLastClientPosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.client (id, "domainName", name, city) VALUES ($1, $2, $3, $4)`,
      [
        clientToCreate.id,
        clientToCreate.domainName,
        clientToCreate.name ?? '',
        clientToCreate.city ?? '',
        lastClientPosition + 1,
      ],
      workspaceId,
      transactionManager,
    );
  }

  public async createClients(
    clientsToCreate: {
      handle: string;
      name: string;
    }[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<ObjectRecord<ClientWorkspaceEntity>[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastClientPosition = await this.getLastClientPosition(
      workspaceId,
      transactionManager,
    );

    clientsToCreate = clientsToCreate.map((contact, index) => ({
      id: v4(),
      ...contact,
      position: lastClientPosition + index + 1,
    }));

    const { flattenedValues, valuesString } =
      getFlattenedValuesAndValuesStringForBatchRawQuery(clientsToCreate, {
        id: 'uuid',
        handle: 'text',
        name: 'text',
        position: 'double precision',
      });

    return await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.client (id, email, "name", "position") VALUES ${valuesString} RETURNING *`,
      flattenedValues,
      workspaceId,
      transactionManager,
    );
  }
}