import { Injectable } from '@nestjs/common';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { EntityManager } from 'typeorm';

export type JobToCreate = {
  id: string;
  name: string;
};

@Injectable()
export class JobRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {
  }

  async getLastJobPosition(
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT MAX(position) FROM ${dataSourceSchema}.job`,
      [],
      workspaceId,
      transactionManager,
    );

    return result[0].max ?? 0;
  }

  async createJob(
    workspaceId: string,
    jobToCreate: JobToCreate,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const lastJobPosition = await this.getLastJobPosition(workspaceId, transactionManager);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.job (id, name, position) VALUES ($1, $2, $3)`,
      [jobToCreate.id, jobToCreate.name, lastJobPosition + 1],
      workspaceId,
      transactionManager,
    );
  }
}