import { EntityManager } from 'typeorm';

export const jobPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.job`, [
      'name',
      'description',
    ])
    .orIgnore()
    .values([
      {
        name: 'Lawn Mowing',
        description: 'Mow the lawn and trim the edges.',
      },
      {
        name: 'Garden Weeding',
        description: 'Remove weeds from the garden beds.',
      },
      {
        name: 'Hedge Trimming',
        description: 'Trim the hedges to maintain shape and health.',
      },
      {
        name: 'Leaf Raking',
        description: 'Rake and collect fallen leaves.',
      },
      {
        name: 'Soil Aeration',
        description: 'Aerate the soil to promote healthy root growth.',
      },
    ])
    .returning('*')
    .execute();
};