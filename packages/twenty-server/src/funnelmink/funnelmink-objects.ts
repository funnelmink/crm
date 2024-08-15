import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { ObjectMetadataService } from 'src/engine/metadata-modules/object-metadata/object-metadata.service';
import { FUNNELMINK_ICONS } from 'src/funnelmink/funnelmink-constants';
import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { CreateFieldInput } from 'src/engine/metadata-modules/field-metadata/dtos/create-field.input';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { FieldMetadataService } from 'src/engine/metadata-modules/field-metadata/field-metadata.service';
import { RelationMetadataService } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.service';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { CreateRelationInput } from 'src/engine/metadata-modules/relation-metadata/dtos/create-relation.input';

// fm TODO: this needs to be fault tolerant and reusable
// - in the future, if a user messes with their data model, we can offer to regen missing objects (and/or fields)
// - as this function iterates, it should catch and log errors without breaking out of the loop

export const addFunnelminkFSMObjectsToWorkspace = async (
  workspaceId: string,
  workspaceDataSourceService: WorkspaceDataSourceService,
  objectMetadataService: ObjectMetadataService,
  fieldMetadataService: FieldMetadataService,
  relationMetadataService: RelationMetadataService,
) => {
  const workspaceDataSource =
    await workspaceDataSourceService.connectToWorkspaceDataSource(workspaceId);

  if (!workspaceDataSource) {
    throw new Error('Could not connect to workspace data source');
  }

  // loop through create funnelmink objects and fields
  await createFunnelminkObjects(
    workspaceId,
    objectMetadataService,
    fieldMetadataService,
  );

  await createFunnelminkRelations(
    workspaceId,
    objectMetadataService,
    relationMetadataService,
  );

  // fm TODO: prefill data (see `standard-objects-prefill-data.ts`)

  // fm TODO: prefill views (see `standard-objects-prefill-data.ts`)

  // fm TODO: a hidden `route` object that ties Crews to Jobs
};

const createFunnelminkObjects = async (
  workspaceId: string,
  objectMetadataService: ObjectMetadataService,
  fieldMetadataService: FieldMetadataService,
) => {
  const metadatas: ObjectMetadataEntity[] = [];

  // loop through, create objects, fields and relations
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

    console.log(
      `[fm] Created object ${object.nameSingular} with ID ${objectMetadata.id}`,
    );
    for (const field of object.fields) {
      const fieldInput: CreateFieldInput = {
        workspaceId: workspaceId,
        objectMetadataId: objectMetadata.id,
        name: field.name,
        label: field.label,
        type: field.type,
        icon: field.icon,
        isRemoteCreation: false,
      };

      await fieldMetadataService.createOne(fieldInput);
    }
    metadatas.push(objectMetadata);
  }
};

const createFunnelminkRelations = async (
  workspaceId: string,
  objectMetadataService: ObjectMetadataService,
  relationMetadataService: RelationMetadataService,
) => {
  const objectMetadatas =
    await objectMetadataService.findManyWithinWorkspace(workspaceId);

  for (const relation of fsmRelationships) {
    const parentMetadata = objectMetadatas.find(
      (metadata) => metadata.namePlural === relation.fromName,
    );
    let toName = relation.toName;

    if (relation.toName === 'crewLead') {
      toName = 'workspaceMembers';
    }
    const childMetadata = objectMetadatas.find(
      (metadata) => metadata.namePlural === toName,
    );

    if (!parentMetadata || !childMetadata) {
      throw new Error(
        `Could not find object metadata for ${relation.fromName} or ${relation.toName}`,
      );
    }

    const input: CreateRelationInput = {
      fromDescription: relation.description,
      fromIcon: relation.fromIcon,
      fromLabel: relation.fromLabel,
      fromName: relation.fromName,
      fromObjectMetadataId: childMetadata.id,
      relationType: relation.type,
      toIcon: relation.toIcon,
      toLabel: relation.toLabel,
      toName: relation.toName,
      toObjectMetadataId: parentMetadata.id,
      workspaceId: workspaceId,
    };

    console.log(
      `[fm] Creating relationship from ${parentMetadata.nameSingular} to ${relation.toName}`,
    );
    await relationMetadataService.createOne(input);
    console.log(
      `[fm] Created relationship from ${parentMetadata.nameSingular} to ${relation.toName}`,
    );
  }
};

const fsmObjects = [
  {
    nameSingular: 'workorder',
    namePlural: 'workorders',
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
  },
  {
    // fm TODO: supplier, quantity, unitType, unitCost, defaultUnitPrice
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
      {
        name: 'scheduledDate',
        label: 'Scheduled Date',
        icon: FUNNELMINK_ICONS.schedule,
        type: FieldMetadataType.DATE_TIME,
      },
      {
        name: 'scheduledDuration',
        label: 'Duration',
        icon: FUNNELMINK_ICONS.scheduledDuration,
        type: FieldMetadataType.NUMBER,
      },
    ],
  },
];

const fsmRelationships = [
  {
    description: 'The Work Orders for this Company',
    fromIcon: FUNNELMINK_ICONS.workorder,
    fromLabel: 'Work Orders',
    fromName: 'workorders',
    toIcon: FUNNELMINK_ICONS.company,
    toLabel: 'Company',
    toName: 'companies',
    type: RelationMetadataType.ONE_TO_MANY,
  },
  {
    description: 'The Work Orders for this Person',
    fromIcon: FUNNELMINK_ICONS.workorder,
    fromLabel: 'Work Orders',
    fromName: 'workorders',
    toIcon: FUNNELMINK_ICONS.person,
    toLabel: 'Person',
    toName: 'people',
    type: RelationMetadataType.ONE_TO_MANY,
  },
  {
    description: 'The Jobs this Work Order represents',
    fromIcon: FUNNELMINK_ICONS.job,
    fromLabel: 'Jobs',
    fromName: 'jobs',
    toIcon: FUNNELMINK_ICONS.workorder,
    toLabel: 'Work Orders',
    toName: 'workorders',
    type: RelationMetadataType.ONE_TO_MANY,
  },
  // {
  //   description: 'The Jobs where this Service is performed',
  //   fromIcon: FUNNELMINK_ICONS.service,
  //   fromLabel: 'Services',
  //   fromName: 'services',
  //   toIcon: FUNNELMINK_ICONS.job,
  //   toLabel: 'Jobs',
  //   toName: 'jobs',
  //   type: RelationMetadataType.MANY_TO_MANY,
  // },
  {
    description: 'The Jobs this Crew is assigned to',
    fromIcon: FUNNELMINK_ICONS.job,
    fromLabel: 'Jobs',
    fromName: 'jobs',
    toIcon: FUNNELMINK_ICONS.crew,
    toLabel: 'Crew',
    toName: 'crews',
    type: RelationMetadataType.ONE_TO_MANY,
  },
  {
    description: 'The Crew Lead',
    fromIcon: FUNNELMINK_ICONS.crew,
    fromLabel: 'Crews',
    fromName: 'crews',
    toIcon: FUNNELMINK_ICONS.member,
    toLabel: 'Crew Lead',
    toName: 'crewLead',
    type: RelationMetadataType.ONE_TO_MANY,
  },
  // {
  //   description: 'The Crew Members',
  //   fromIcon: FUNNELMINK_ICONS.crew,
  //   fromLabel: 'Crews',
  //   fromName: 'crews',
  //   toIcon: FUNNELMINK_ICONS.member,
  //   toLabel: 'Crew Members',
  //   toName: 'crewMembers',
  //   type: RelationMetadataType.MANY_TO_MANY,
  // },
  // {
  //   description: 'The Jobs this Material is used for',
  //   fromIcon: FUNNELMINK_ICONS.material,
  //   fromLabel: 'Materials',
  //   fromName: 'materials',
  //   toIcon: FUNNELMINK_ICONS.job,
  //   toLabel: 'Jobs',
  //   toName: 'jobs',
  //   type: RelationMetadataType.MANY_TO_MANY,
  // },
];
