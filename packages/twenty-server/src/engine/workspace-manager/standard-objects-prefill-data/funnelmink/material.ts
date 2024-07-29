import { EntityManager } from 'typeorm';

export const materialPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.material`, [
      'name',
      'description',
    ])
    .orIgnore()
    .values([
      {
        name: 'Mulch',
        description: 'Organic material spread over the soil to retain moisture.',
      },
      {
        name: 'Topsoil',
        description: 'High-quality soil for planting and landscaping.',
      },
      {
        name: 'Gravel',
        description: 'Small stones used for paths and driveways.',
      },
      {
        name: 'Fertilizer',
        description: 'Nutrient-rich substance to enhance plant growth.',
      },
      {
        name: 'Pavers',
        description: 'Stone or concrete blocks used for paving paths or patios.',
      },
    ])
    .returning('*')
    .execute();
};