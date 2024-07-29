import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';

import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';

export type CrewToCreate = {
  id: string;
  name: string;
};

@Injectable()
export class CrewRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  async getLastCrewPosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.crew`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async createCrew(
    workspaceId: string,
    crewToCreate: CrewToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastCrewPosition = await this.getLastCrewPosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.crew (id, name, position) VALUES ($1, $2, $3)`,
      [crewToCreate.id, crewToCreate.name, lastCrewPosition + 1],
      workspaceId,
      transactionManager,
    );
  }
}
