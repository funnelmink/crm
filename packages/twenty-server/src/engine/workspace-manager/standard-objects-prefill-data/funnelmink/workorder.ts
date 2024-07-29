import { EntityManager } from 'typeorm';

export const workorderPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.work_order`, [
      'name',
      'description',
    ])
    .orIgnore()
    .values([
      {
        name: 'Spring Lawn Cleanup',
        description: 'Remove debris, rake leaves, and prepare the lawn for spring.',
      },
      {
        name: 'Summer Garden Planting',
        description: 'Plant summer flowers and vegetables in the garden.',
      },
      {
        name: 'Fall Leaf Removal',
        description: 'Rake and remove fallen leaves from the property.',
      },
      {
        name: 'Winter Tree Pruning',
        description: 'Prune trees to promote healthy growth in the spring.',
      },
      {
        name: 'Paver Patio Installation',
        description: 'Install a new paver patio in the backyard.',
      },
    ])
    .returning('*')
    .execute();
};