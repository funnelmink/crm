import { DataSource, EntityManager } from 'typeorm';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { companyPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/company';
import { personPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/person';
import { viewPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/view';

export const funnelminkObjectsPrefillData = async (
  workspaceDataSource: DataSource,
  schemaName: string,
  objectMetadata: ObjectMetadataEntity[],
) => {
  const objectMetadataMap = objectMetadata.reduce((acc, object) => {
    if (!object.standardId) {
      throw new Error('Standard Id is not set for object: ${object.name}');
    }

    acc[object.standardId] = {
      id: object.id,
      fields: object.fields.reduce((acc, field) => {
        if (!field.standardId) {
          throw new Error('Standard Id is not set for field: ${field.name}');
        }

        acc[field.standardId] = field.id;

        return acc;
      }, {}),
    };

    return acc;
  }, {});

  workspaceDataSource.transaction(async (entityManager: EntityManager) => {
    // TODO: something similar to the following, but with custom objects
    // - it has to be custom so it can work seamlessly with the existing system (and as a plugin in the future)
    // await companyPrefillData(entityManager, schemaName);
    // await personPrefillData(entityManager, schemaName);
    // await viewPrefillData(entityManager, schemaName, objectMetadataMap);
  });
};
