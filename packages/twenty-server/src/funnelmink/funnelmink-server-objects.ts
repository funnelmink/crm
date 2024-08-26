import { FUNNELMINK_ICONS } from 'src/funnelmink/funnelmink-server-constants';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';

export const FUNNELMINK_OBJECTS = [
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

export const FUNNELMINK_RELATIONSHIPS = [
  {
    description: 'The Jobs this Work Order represents',
    fromIcon: FUNNELMINK_ICONS.job,
    fromLabel: 'Jobs',
    fromName: 'jobs',
    toIcon: FUNNELMINK_ICONS.workOrder,
    toLabel: 'Work Orders',
    toName: 'workOrders',
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
