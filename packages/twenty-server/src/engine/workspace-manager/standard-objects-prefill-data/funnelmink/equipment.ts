import { EntityManager } from 'typeorm';

export const equipmentPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.equipment`, [
      'name',
      'description',
    ])
    .orIgnore()
    .values([
      {
        name: 'Lawn Mower',
        description: 'Machine used for cutting grass.',
      },
      {
        name: 'Leaf Blower',
        description: 'Tool to blow leaves and debris off surfaces.',
      },
      {
        name: 'Hedge Trimmer',
        description: 'Tool to trim and shape hedges and bushes.',
      },
      {
        name: 'Shovel',
        description: 'Tool used for digging and moving soil.',
      },
      {
        name: 'Wheelbarrow',
        description: 'Single-wheeled cart for transporting materials.',
      },
    ])
    .returning('*')
    .execute();
};