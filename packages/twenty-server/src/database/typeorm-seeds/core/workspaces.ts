import { DataSource } from 'typeorm';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

const tableName = 'workspace';

export const SEED_APPLE_WORKSPACE_ID = '20202020-1c25-4d02-bf25-6aeccf7ea419';
export const SEED_TWENTY_WORKSPACE_ID = '3b8e6458-5fc1-4e63-8563-008ccddaa6db';

export const seedWorkspaces = async (
  workspaceDataSource: DataSource,
  schemaName: string,
  workspaceId: string,
) => {
  const workspaces: {
    [key: string]: Pick<
      Workspace,
      'id' | 'displayName' | 'domainName' | 'inviteHash' | 'logo'
    >;
  } = {
    [SEED_APPLE_WORKSPACE_ID]: {
      id: workspaceId,
      displayName: 'Apple',
      domainName: 'apple.dev',
      inviteHash: 'apple.dev-invite-hash',
      logo: 'data:image/png;base64,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',
    },
    [SEED_TWENTY_WORKSPACE_ID]: {
      id: workspaceId,
      displayName: 'Twenty',
      domainName: 'twenty.dev',
      inviteHash: 'twenty.dev-invite-hash',
      logo: 'data:image/png;base64,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',
    },
  };

  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${tableName}`, [
      'id',
      'displayName',
      'domainName',
      'inviteHash',
      'logo',
    ])
    .orIgnore()
    .values(workspaces[workspaceId])
    .execute();
};

export const deleteWorkspaces = async (
  workspaceDataSource: DataSource,
  schemaName: string,
  workspaceId: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .delete()
    .from(`${schemaName}.${tableName}`)
    .where(`${tableName}."id" = :id`, { id: workspaceId })
    .execute();
};
