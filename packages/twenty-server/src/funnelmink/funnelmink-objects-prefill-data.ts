import { DataSource, EntityManager } from 'typeorm';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { companyPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/company';
import { personPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/person';
import { viewPrefillData } from 'src/engine/workspace-manager/standard-objects-prefill-data/view';
import { DataSourceEntity } from 'src/engine/metadata-modules/data-source/data-source.entity';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { ObjectMetadataService } from 'src/engine/metadata-modules/object-metadata/object-metadata.service';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const prefillWorkspaceWithFunnelminkFSMObjects = async (
  dataSourceMetadata: DataSourceEntity,
  workspaceId: string,
  workspaceDataSourceService: WorkspaceDataSourceService,
  objectMetadataService: ObjectMetadataService,
) => {
  const workspaceDataSource =
    await workspaceDataSourceService.connectToWorkspaceDataSource(
      workspaceId,
    );

  if (!workspaceDataSource) {
    throw new Error('Could not connect to workspace data source');
  }

  // disable standard objects
  // await disableStandardObjects(objectMetadataService);

  // create funnelmink objects


  // populate funnelmink objects with prefill data
};

// const funnelminkObjectsPrefillData = async (
//   workspaceDataSource: DataSource,
//   schemaName: string,
//   objectMetadata: ObjectMetadataEntity[],
// ) => {
//   const objectMetadataMap = objectMetadata.reduce((acc, object) => {
//     if (!object.standardId) {
//       throw new Error('Standard Id is not set for object: ${object.name}');
//     }
//
//     acc[object.standardId] = {
//       id: object.id,
//       fields: object.fields.reduce((acc, field) => {
//         if (!field.standardId) {
//           throw new Error('Standard Id is not set for field: ${field.name}');
//         }
//
//         acc[field.standardId] = field.id;
//
//         return acc;
//       }, {}),
//     };
//
//     return acc;
//   }, {});
//
//   workspaceDataSource.transaction(async (entityManager: EntityManager) => {
// TODO: something similar to the following, but with custom objects
// - it has to be custom so it can work seamlessly with the existing system (and as a plugin in the future)
// await companyPrefillData(entityManager, schemaName);
// await personPrefillData(entityManager, schemaName);
// await viewPrefillData(entityManager, schemaName, objectMetadataMap);
//   });
// };

const disableStandardObjects = async (
  objectMetadataService: ObjectMetadataService,
) => {
  const standardObjectIds = [
    STANDARD_OBJECT_IDS.person,
    STANDARD_OBJECT_IDS.company,
    STANDARD_OBJECT_IDS.opportunity,
  ];

  await Promise.all(standardObjectIds.map(async (objectId) => {
    await objectMetadataService.updateOne(
      objectId,
      { isActive: false },
    );
  }));
};