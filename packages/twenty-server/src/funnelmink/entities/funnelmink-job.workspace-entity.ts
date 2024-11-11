import { Relation } from 'typeorm';

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
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';

import { WorkOrderWorkspaceEntity } from './funnelmink-workorder.workspace-entity';
import { CrewWorkspaceEntity } from './funnelmink-crew.workspace-entity';

// fm TODO: duration, start, address, (more?)
@WorkspaceEntity({
  standardId: FUNNELMINK_IDS.job,
  namePlural: 'jobs',
  labelSingular: 'Job',
  labelPlural: 'Jobs',
  description: 'A Job',
  icon: FUNNELMINK_ICONS.job,
  labelIdentifierStandardId: FUNNELMINK_IDS.jobName,
})
export class JobWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FUNNELMINK_IDS.jobName,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Job name',
    icon: FUNNELMINK_ICONS.job,
  })
  name: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.jobDescription,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Job description',
    icon: FUNNELMINK_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.jobCreatedBy,
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
    standardId: FUNNELMINK_IDS.jobPosition,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Job record position',
    icon: FUNNELMINK_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.jobScheduledDate,
    type: FieldMetadataType.DATE_TIME,
    label: 'Scheduled date',
    description: 'Scheduled date',
    icon: FUNNELMINK_ICONS.scheduledDate,
    defaultValue: null,
  })
  @WorkspaceIsNullable()
  scheduledDate: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.jobScheduledDuration,
    type: FieldMetadataType.DATE_TIME,
    label: 'Scheduled duration',
    description: 'Scheduled duration',
    icon: FUNNELMINK_ICONS.scheduledDuration,
    defaultValue: null,
  })
  @WorkspaceIsNullable()
  scheduledDuration: string;

  // First-class Relations
  // fm TODO: material, service (need many-to-many)
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobWorkOrder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'Work Order the Job is assigned to.',
    icon: FUNNELMINK_ICONS.workOrder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  workOrder: Relation<WorkOrderWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workOrder')
  workOrderId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobCrew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'Crew the Job is assigned to.',
    icon: FUNNELMINK_ICONS.crew,
    inverseSideTarget: () => CrewWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('crew')
  crewId: string | null;

  // Second-class Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobTaskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the Job',
    icon: FUNNELMINK_ICONS.tasks,
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobNoteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the Job',
    icon: FUNNELMINK_ICONS.notes,
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobFavorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Job',
    icon: FUNNELMINK_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobAttachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Job',
    icon: FUNNELMINK_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.jobTimelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Job',
    icon: FUNNELMINK_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
