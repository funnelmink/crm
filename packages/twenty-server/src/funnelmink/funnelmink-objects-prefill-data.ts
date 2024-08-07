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
import { FUNNELMINK_ICONS } from 'src/funnelmink/funnelmink-constants';
import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { object } from 'zod';

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

  // loop through create funnelmink objects (function)
  await createFunnelminkObjects(workspaceId, objectMetadataService);

  // loop through and add create fields (function)
  // - go item by item
  // - check my prior branch for which fields go on what
  // - stickyNote, etc

  // loop through and create relationships (function)
  // - again, check my prior branch

  // lastly, prefill data (function)
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

const createFunnelminkObjects = async (
  workspaceId: string,
  objectMetadataService: ObjectMetadataService,
) => {

  for (const object of objects) {
    const input: CreateObjectInput = {
      dataSourceId: '',
      workspaceId: workspaceId,
      nameSingular: object.nameSingular,
      namePlural: object.namePlural,
      labelSingular: object.labelSingular,
      labelPlural: object.labelPlural,
      description: object.description,
      icon: object.icon,
      isRemote: object.isRemote,
    };
    const objectMetadata = await objectMetadataService.createOne(input);

    // create fields
    // - go item by item
    // - check my prior branch for which fields go on what
    // - stickyNote, etc
  }

// - figure out where new objects are normally made (SettingsNewObject.tsx)
  //    - (if I can't find a resolver, because it might not exist, then I'll have to create the objects manually)
  //    - (this could be done by looking up the `companyPrefillData`, `personPrefillData`, and `viewPrefillData` implementations)
  // - save sends the following data
  /*
  export const settingsDataModelObjectAboutFormSchema =
    objectMetadataItemSchema.pick({
    description: true,
    icon: true,
    labelPlural: true,
    labelSingular: true,
  });
  * */
  // - find the resolver
  // - manually send my data to that same resolver
};

/* OBJECTS
*     const objectMetadata = await this.objectMetadataService.createOne({
      nameSingular: camelCase(localTableNameSingular),
      namePlural: camelCase(localTableNamePlural),
      labelSingular: camelToTitleCase(camelCase(localTableBaseName)),
      labelPlural: camelToTitleCase(plural(camelCase(localTableBaseName))),
      description: 'Remote table',
      dataSourceId: dataSourceMetadataId,
      workspaceId: workspaceId,
      icon: 'IconPlug',
      isRemote: true,
      primaryKeyColumnType: distantTableIdColumn.udtName,
      primaryKeyFieldMetadataSettings: mapUdtNameToFieldSettings(
        distantTableIdColumn.udtName,
      ),
    } satisfies CreateObjectInput);
    *
    *
    * FIELDS
    *   private async createFieldMetadataForForeignTableColumn(
    workspaceId: string,
    columnName: string,
    columnType: string,
    objectMetadataId: string,
  ): Promise<FieldMetadataEntity<'default'>> {
    return this.fieldMetadataService.createOne({
      name: columnName,
      label: camelToTitleCase(columnName),
      description: 'Field of remote',
      type: mapUdtNameToFieldType(columnType),
      workspaceId: workspaceId,
      objectMetadataId: objectMetadataId,
      isRemoteCreation: true,
      isNullable: true,
      icon: 'IconPlug',
      settings: mapUdtNameToFieldSettings(columnType),
    } satisfies CreateFieldInput);
  }
* */

const objects = [
  {
    nameSingular: 'workOrder',
    namePlural: 'workOrders',
    labelSingular: 'Work Order',
    labelPlural: 'Work Orders',
    description: 'A Work Order',
    isRemote: false,
    icon: FUNNELMINK_ICONS.workorder,
  },
  {
    nameSingular: 'service',
    namePlural: 'services',
    labelSingular: 'Service',
    labelPlural: 'Services',
    description: 'A Service',
    isRemote: false,
    icon: FUNNELMINK_ICONS.service,
  },
  {
    nameSingular: 'crew',
    namePlural: 'crews',
    labelSingular: 'Crew',
    labelPlural: 'Crews',
    description: 'A Crew',
    isRemote: false,
    icon: FUNNELMINK_ICONS.crew,
  },
  {
    nameSingular: 'equipment',
    namePlural: 'equipments',
    labelSingular: 'Equipment',
    labelPlural: 'Equipment',
    description: 'Equipment',
    isRemote: false,
    icon: FUNNELMINK_ICONS.equipment,
  },
  {
    nameSingular: 'material',
    namePlural: 'materials',
    labelSingular: 'Material',
    labelPlural: 'Materials',
    description: 'Material',
    isRemote: false,
    icon: FUNNELMINK_ICONS.material,
  },
  {
    nameSingular: 'job',
    namePlural: 'jobs',
    labelSingular: 'Job',
    labelPlural: 'Jobs',
    description: 'Job',
    isRemote: false,
    icon: FUNNELMINK_ICONS.job,
  },
];