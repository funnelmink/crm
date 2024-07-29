import { EntityManager } from 'typeorm';

export const servicePrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.service`, [
      'name',
      'description',
    ])
    .orIgnore()
    .values([
      {
        name: 'Lawn Maintenance',
        description: 'Regular mowing, edging, and fertilizing of lawns.',
      },
      {
        name: 'Garden Design',
        description: 'Creating garden layouts and planting schemes.',
      },
      {
        name: 'Tree Pruning',
        description: 'Trimming and shaping trees for health and aesthetics.',
      },
      {
        name: 'Irrigation Installation',
        description: 'Setting up watering systems for gardens and lawns.',
      },
      {
        name: 'Pest Control',
        description: 'Managing and eliminating pests from outdoor areas.',
      },
    ])
    .returning('*')
    .execute();
};