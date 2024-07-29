import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import {
  JOB_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { Relation } from 'typeorm';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import {
  TimelineActivityWorkspaceEntity,
} from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { EquipmentWorkspaceEntity } from 'src/modules/funnelmink/equipment.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/modules/funnelmink/material.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/modules/funnelmink/service.workspace-entity';
import {
  STANDARD_ICONS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.jobs,
  namePlural: 'jobs',
  labelSingular: 'Job',
  labelPlural: 'Jobs',
  description: 'A job to be done',
  icon: STANDARD_ICONS.job,
})
export class JobWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: JOB_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Job name',
    icon: STANDARD_ICONS.job,
  })
  name: string;

  @WorkspaceField({
    standardId: JOB_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Job description',
    icon: STANDARD_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: JOB_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Job record position',
    icon: STANDARD_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.equipment,
    type: RelationMetadataType.MANY_TO_MANY,
    label: 'Equipment',
    description: 'Equipment required for this Job',
    icon: STANDARD_ICONS.equipment,
    inverseSideTarget: () => EquipmentWorkspaceEntity,
    inverseSideFieldKey: 'jobs',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  equipment: Relation<EquipmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.services,
    type: RelationMetadataType.MANY_TO_MANY,
    label: 'Services',
    description: 'Services performed during this Job',
    icon: STANDARD_ICONS.service,
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'jobs',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  services: Relation<ServiceWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.materials,
    type: RelationMetadataType.MANY_TO_MANY,
    label: 'Materials',
    description: 'Materials required for this Job',
    icon: STANDARD_ICONS.material,
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'jobs',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  materials: Relation<MaterialWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.workorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'The Work Order this Job is assigned to',
    icon: STANDARD_ICONS.workorder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'jobs',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  workorder: Relation<WorkOrderWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.activityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'Activities tied to the Job',
    icon: STANDARD_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  activityTargets: Relation<ActivityTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Job',
    icon: STANDARD_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Job',
    icon: STANDARD_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: JOB_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Job',
    icon: STANDARD_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}