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
import { CreateFieldInput } from 'src/engine/metadata-modules/field-metadata/dtos/create-field.input';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { FieldMetadataService } from 'src/engine/metadata-modules/field-metadata/field-metadata.service';

export const prefillWorkspaceWithFunnelminkFSMObjects = async (
  dataSourceMetadata: DataSourceEntity,
  workspaceId: string,
  workspaceDataSourceService: WorkspaceDataSourceService,
  objectMetadataService: ObjectMetadataService,
  fieldMetadataService: FieldMetadataService,
) => {
  const workspaceDataSource =
    await workspaceDataSourceService.connectToWorkspaceDataSource(
      workspaceId,
    );

  if (!workspaceDataSource) {
    throw new Error('Could not connect to workspace data source');
  }

  // loop through create funnelmink objects and fields
  await createFunnelminkObjects(workspaceId, objectMetadataService, fieldMetadataService);

  // loop through and create relationships (function)


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
  fieldMetadataService: FieldMetadataService,
) => {

  for (const object of fsmObjects) {
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
    for (const field of object.fields) {
      const jnput: CreateFieldInput = {
        workspaceId: workspaceId,
        objectMetadataId: objectMetadata.id,
        name: field.name,
        label: field.label,
        type: field.type,
        icon: field.icon,
        isRemoteCreation: false,
      };
      await fieldMetadataService.createOne(jnput);
    }
  }

};

const fsmObjects = [
  {
    nameSingular: 'workOrder',
    namePlural: 'workOrders',
    labelSingular: 'Work Order',
    labelPlural: 'Work Orders',
    description: 'A Work Order',
    isRemote: false,
    icon: FUNNELMINK_ICONS.workorder,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
      {
        name: 'description',
        label: 'Description',
        icon: FUNNELMINK_ICONS.description,
        type: FieldMetadataType.TEXT,
      },
    ],
    relationships: [
      {
        name: 'company',
        destination: 'company',
        type: 'manyToOne',
      },
      {
        name: 'person',
        destination: 'person',
        type: 'manyToOne',
      },
      {
        name: 'jobs',
        destination: 'job',
        type: 'oneToMany',
      },
    ],
  },
  {
    nameSingular: 'service',
    namePlural: 'services',
    labelSingular: 'Service',
    labelPlural: 'Services',
    description: 'A Service',
    isRemote: false,
    icon: FUNNELMINK_ICONS.service,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
      {
        name: 'description',
        label: 'Description',
        icon: FUNNELMINK_ICONS.description,
        type: FieldMetadataType.TEXT,
      },
    ],
    relationships: [
      {
        name: 'jobs',
        destination: 'job',
        type: 'manyToMany',
      },
    ],
  },
  {
    nameSingular: 'crew',
    namePlural: 'crews',
    labelSingular: 'Crew',
    labelPlural: 'Crews',
    description: 'A Crew',
    isRemote: false,
    icon: FUNNELMINK_ICONS.crew,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
    ],
    relationships: [
      {
        name: 'jobs',
        destination: 'job',
        type: 'oneToMany',
      },
      {
        name: 'Crew Lead',
        description: 'The Crew Lead',
        destination: 'Workspace Members',
        type: 'belongsToOne',
      },
      {
        name: 'crewMembers',
        destination: 'member',
        type: 'manyToMany',
      },
    ],
  },
  {
    nameSingular: 'equipment',
    namePlural: 'equipments',
    labelSingular: 'Equipment',
    labelPlural: 'Equipment',
    description: 'Equipment',
    isRemote: false,
    icon: FUNNELMINK_ICONS.equipment,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
    ],
  },
  {
    nameSingular: 'material',
    namePlural: 'materials',
    labelSingular: 'Material',
    labelPlural: 'Materials',
    description: 'Material',
    isRemote: false,
    icon: FUNNELMINK_ICONS.material,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
    ],
  },
  {
    nameSingular: 'job',
    namePlural: 'jobs',
    labelSingular: 'Job',
    labelPlural: 'Jobs',
    description: 'Job',
    isRemote: false,
    icon: FUNNELMINK_ICONS.job,
    fields: [
      {
        name: 'stickyNote',
        label: 'Sticky Note',
        icon: FUNNELMINK_ICONS.stickyNote,
        type: FieldMetadataType.TEXT,
      },
      {
        name: 'description',
        label: 'Description',
        icon: FUNNELMINK_ICONS.description,
        type: FieldMetadataType.TEXT,
      },
    ],
  },
];