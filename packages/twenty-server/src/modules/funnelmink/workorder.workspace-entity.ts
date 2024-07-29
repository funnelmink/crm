import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
  STANDARD_ICONS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import {
  WORKORDER_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';
import { Relation } from 'typeorm';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import {
  TimelineActivityWorkspaceEntity,
} from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.workorder,
  namePlural: 'work orders',
  labelSingular: 'Work Order',
  labelPlural: 'Work Orders',
  description: 'Work Order',
  icon: STANDARD_ICONS.workorder,
})
export class WorkOrderWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: WORKORDER_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Work Order name',
    icon: STANDARD_ICONS.workorder,
  })
  name: string;

  @WorkspaceField({
    standardId: WORKORDER_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Work Order description',
    icon: STANDARD_ICONS.workorder,
  })
  description: string;

  @WorkspaceField({
    standardId: WORKORDER_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Work Order record position',
    icon: STANDARD_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.jobs,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Jobs',
    description: 'Jobs for this Work Order',
    icon: STANDARD_ICONS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  jobs: Relation<JobWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.client,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Client',
    description: 'The Client this Work Order is for',
    icon: STANDARD_ICONS.workorder,
    inverseSideTarget: () => ClientWorkspaceEntity,
    inverseSideFieldKey: 'workorders',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  client: Relation<ClientWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.activityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'Activities tied to the Work Order',
    icon: STANDARD_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  activityTargets: Relation<ActivityTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Work Order',
    icon: STANDARD_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Work Order',
    icon: STANDARD_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: WORKORDER_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Work Order',
    icon: STANDARD_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}