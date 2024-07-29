import { Injectable } from '@nestjs/common';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { EntityManager } from 'typeorm';

export type ServiceToCreate = {
  id: string;
  name: string;
};

@Injectable()
export class ServiceRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  async getLastServicePosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.service`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async createService(
    workspaceId: string,
    serviceToCreate: ServiceToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastServicePosition = await this.getLastServicePosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.service (id, name, position) VALUES ($1, $2, $3)`,
      [serviceToCreate.id, serviceToCreate.name, lastServicePosition + 1],
      workspaceId,
      transactionManager,
    );
  }
}