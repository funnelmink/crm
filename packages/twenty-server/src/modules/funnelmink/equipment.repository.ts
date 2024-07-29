import { Injectable } from '@nestjs/common';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { EntityManager } from 'typeorm';

export type EquipmentToCreate = {
  id: string;
  name: string;
};

@Injectable()
export class EquipmentRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  async getLastEquipmentPosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.equipment`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async createEquipment(
    workspaceId: string,
    equipmentToCreate: EquipmentToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastEquipmentPosition = await this.getLastEquipmentPosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.equipment (id, name, position) VALUES ($1, $2, $3)`,
      [equipmentToCreate.id, equipmentToCreate.name, lastEquipmentPosition + 1],
      workspaceId,
      transactionManager,
    );
  }
}