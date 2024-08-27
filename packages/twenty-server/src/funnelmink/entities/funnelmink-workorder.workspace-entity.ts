import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import {
  FUNNELMINK_ICONS,
  FUNNELMINK_IDS,
} from 'src/funnelmink/funnelmink-server-constants';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  ActorMetadata,
  FieldActorSource,
} from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { WorkspaceIndex } from 'src/engine/twenty-orm/decorators/workspace-index.decorator';
import { JobWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-job.workspace-entity';

@WorkspaceEntity({
  standardId: FUNNELMINK_IDS.workOrder,
  namePlural: 'workOrders',
  labelSingular: 'Work Order',
  labelPlural: 'Work Orders',
  description: 'A Work Order',
  icon: FUNNELMINK_ICONS.workOrder,
  labelIdentifierStandardId: FUNNELMINK_IDS.workOrderName,
  softDelete: true,
})
export class WorkOrderWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workOrderName,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Work Order name',
    icon: FUNNELMINK_ICONS.workOrder,
  })
  name: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workOrderCreatedBy,
    type: FieldMetadataType.ACTOR,
    label: 'Created by',
    icon: FUNNELMINK_ICONS.createdBy,
    description: 'The creator of the record',
    defaultValue: {
      source: `'${FieldActorSource.MANUAL}'`,
      name: "''",
    },
  })
  createdBy: ActorMetadata;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workOrderClosedDate,
    type: FieldMetadataType.DATE_TIME,
    label: 'Closed date',
    description: 'Closed date',
    icon: FUNNELMINK_ICONS.closedDate,
    defaultValue: null,
  })
  @WorkspaceIsNullable()
  closedDate: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workOrderPosition,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Work Order record position',
    icon: FUNNELMINK_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workOrderStage,
    type: FieldMetadataType.SELECT,
    label: 'Status',
    description: 'Work Order status',
    icon: FUNNELMINK_ICONS.status,
    options: [
      {
        value: 'NEW',
        label: 'New',
        position: 0,
        color: 'green',
      },
      {
        value: 'IN_PROGRESS',
        label: 'In Progress',
        position: 1,
        color: 'sky',
      },
      {
        value: 'COMPLETED',
        label: 'Completed',
        position: 2,
        color: 'purple',
      },
      {
        value: 'ON_HOLD',
        label: 'On Hold',
        position: 3,
        color: 'yellow',
      },
      {
        value: 'CANCELLED',
        label: 'Cancelled',
        position: 4,
        color: 'gray',
      },
    ],
    defaultValue: "'NEW'",
  })
  @WorkspaceIndex()
  stage: string;

  // First-class Relations
  // TODO: invoice
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderPerson,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'Person the Work Order is assigned to.',
    icon: FUNNELMINK_ICONS.person,
    inverseSideTarget: () => PersonWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderCompany,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'Company the Work Order is assigned to.',
    icon: FUNNELMINK_ICONS.company,
    inverseSideTarget: () => CompanyWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderJobs,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Jobs',
    description: 'Jobs linked to the Work Order',
    icon: FUNNELMINK_ICONS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  jobs: Relation<JobWorkspaceEntity[]>;

  // Second-class Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderActivityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'The Activities tied to this Work Order',
    icon: FUNNELMINK_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  activityTargets: Relation<ActivityTargetWorkspaceEntity>[];

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderTaskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the Work Order',
    icon: FUNNELMINK_ICONS.tasks,
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderNoteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the Work Order',
    icon: FUNNELMINK_ICONS.notes,
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderFavorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Work Order',
    icon: FUNNELMINK_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderAttachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Work Order',
    icon: FUNNELMINK_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workOrderTimelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Work Order',
    icon: FUNNELMINK_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
