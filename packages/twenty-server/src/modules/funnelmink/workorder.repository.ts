import { Injectable } from '@nestjs/common';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { EntityManager } from 'typeorm';

export type WorkOrderToCreate = {
  id: string;
  name: string;
};

@Injectable()
export class WorkOrderRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  async getLastWorkOrderPosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.workorder`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async createWorkOrder(
    workspaceId: string,
    workorderToCreate: WorkOrderToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastWorkOrderPosition = await this.getLastWorkOrderPosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.workorder (id, name, position) VALUES ($1, $2, $3)`,
      [workorderToCreate.id, workorderToCreate.name, lastWorkOrderPosition + 1],
      workspaceId,
      transactionManager,
    );
  }
}