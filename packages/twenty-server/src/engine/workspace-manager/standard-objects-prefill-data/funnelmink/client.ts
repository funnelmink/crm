import { EntityManager } from 'typeorm';

export const clientPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.client`, [
      'name',
      'domainName',
      'address',
      'position',
    ])
    .orIgnore()
    .values([
      {
        name: 'Airbnb',
        domainName: 'airbnb.com',
        address: 'San Francisco',
        position: 1,
      },
      {
        name: 'Qonto',
        domainName: 'qonto.com',
        address: 'San Francisco',
        position: 2,
      },
      {
        name: 'Stripe',
        domainName: 'stripe.com',
        address: 'San Francisco',
        position: 3,
      },
      {
        name: 'Figma',
        domainName: 'figma.com',
        address: 'San Francisco',
        position: 4,
      },
      {
        name: 'Notion',
        domainName: 'notion.com',
        address: 'San Francisco',
        position: 5,
      },
    ])
    .returning('*')
    .execute();
};
