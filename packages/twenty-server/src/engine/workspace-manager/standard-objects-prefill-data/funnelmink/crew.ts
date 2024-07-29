import { EntityManager } from 'typeorm';

export const crewPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.crew`, [
      'name',
      'stickyNote',
    ])
    .orIgnore()
    .values([
      {
        name: 'Tree Care Team',
        stickyNote: 'Specializes in tree trimming, pruning, and removal.',
      },
      {
        name: 'Lawn Maintenance Crew',
        stickyNote: 'Handles mowing, edging, and fertilizing of lawns.',
      },
      {
        name: 'Irrigation Specialists',
        stickyNote: 'Installs and maintains irrigation systems.',
      },
      {
        name: 'Garden Design Crew',
        stickyNote: 'Focuses on designing and planting gardens.',
      },
      {
        name: 'Hardscape Team',
        stickyNote: 'Builds patios, walkways, and retaining walls.',
      },
    ])
    .returning('*')
    .execute();
};