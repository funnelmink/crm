import { DataSource, EntityManager } from 'typeorm';

import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { viewPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/view';
import { clientPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/client';
import { jobPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/job';
import { crewPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/crew';
import { equipmentPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/equipment';
import { materialPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/material';
import { servicePrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/service';
import { workorderPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/workorder';

export const standardObjectsPrefillData = async (
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

  await workspaceDataSource.transaction(async (entityManager: EntityManager) => {
    await clientPrefillData(entityManager, schemaName);
    await crewPrefillData(entityManager, schemaName);
    await equipmentPrefillData(entityManager, schemaName);
    await jobPrefillData(entityManager, schemaName);
    await materialPrefillData(entityManager, schemaName);
    await servicePrefillData(entityManager, schemaName);
    await workorderPrefillData(entityManager, schemaName);
    await viewPrefillData(entityManager, schemaName, objectMetadataMap);
  });
};
