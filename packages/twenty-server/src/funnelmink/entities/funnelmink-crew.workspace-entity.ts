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
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { JobWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-job.workspace-entity';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';

@WorkspaceEntity({
  standardId: FUNNELMINK_IDS.crew,
  namePlural: 'crews',
  labelSingular: 'Crew',
  labelPlural: 'Crews',
  description: 'A Crew',
  icon: FUNNELMINK_ICONS.crew,
  labelIdentifierStandardId: FUNNELMINK_IDS.crewName,
  softDelete: true,
})
export class CrewWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FUNNELMINK_IDS.crewName,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Crew name',
    icon: FUNNELMINK_ICONS.crew,
  })
  name: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.crewDescription,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Crew description',
    icon: FUNNELMINK_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.crewCreatedBy,
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
    standardId: FUNNELMINK_IDS.crewPosition,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Crew record position',
    icon: FUNNELMINK_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  // First-class Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewJobs,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Jobs',
    description: 'Jobs assigned to the Crew',
    icon: FUNNELMINK_ICONS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  jobs: Relation<JobWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewLead,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew Lead',
    description: 'The team member responsible for managing this Crew',
    icon: FUNNELMINK_ICONS.crewLead,
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'crewLeadCrews',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  crewLead: Relation<WorkspaceMemberWorkspaceEntity> | null;

  @WorkspaceJoinColumn('crewLead')
  crewLeadId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewMembers,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Crew Members',
    description: 'The team members assigned to this Crew',
    icon: FUNNELMINK_ICONS.member,
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'crew',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  crewMembers: Relation<WorkspaceMemberWorkspaceEntity[]>;

  // Second-class Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewActivityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'The Activities tied to this Crew',
    icon: FUNNELMINK_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  activityTargets: Relation<ActivityTargetWorkspaceEntity>[];

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewTaskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the Crew',
    icon: FUNNELMINK_ICONS.tasks,
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewNoteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the Crew',
    icon: FUNNELMINK_ICONS.notes,
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewFavorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Crew',
    icon: FUNNELMINK_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewAttachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Crew',
    icon: FUNNELMINK_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.crewTimelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Crew',
    icon: FUNNELMINK_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
