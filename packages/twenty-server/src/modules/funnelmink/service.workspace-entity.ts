import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import {
  MATERIAL_STANDARD_FIELD_IDS,
  SERVICE_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';
import { Relation } from 'typeorm';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import {
  TimelineActivityWorkspaceEntity,
} from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import {
  STANDARD_ICONS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.service,
  namePlural: 'services',
  labelSingular: 'Service',
  labelPlural: 'Services',
  description: 'A service',
  icon: STANDARD_ICONS.service,
})
export class ServiceWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: SERVICE_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Service name',
    icon: STANDARD_ICONS.service,
  })
  name: string;

  @WorkspaceField({
    standardId: SERVICE_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Service description',
    icon: STANDARD_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: SERVICE_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Service record position',
    icon: STANDARD_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceRelation({
    standardId: MATERIAL_STANDARD_FIELD_IDS.jobs,
    type: RelationMetadataType.MANY_TO_MANY,
    label: 'Jobs',
    description: 'Jobs utilizing this Service',
    icon: STANDARD_ICONS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'services',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  jobs: Relation<JobWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: MATERIAL_STANDARD_FIELD_IDS.activityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'Activities tied to the Service',
    icon: STANDARD_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  activityTargets: Relation<ActivityTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: MATERIAL_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Service',
    icon: STANDARD_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: MATERIAL_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Service',
    icon: STANDARD_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: MATERIAL_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Service',
    icon: STANDARD_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}