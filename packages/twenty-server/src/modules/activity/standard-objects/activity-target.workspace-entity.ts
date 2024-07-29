import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import {
  ACTIVITY_TARGET_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { ActivityWorkspaceEntity } from 'src/modules/activity/standard-objects/activity.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CrewWorkspaceEntity } from 'src/modules/funnelmink/crew.workspace-entity';
import { STANDARD_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { MaterialWorkspaceEntity } from 'src/modules/funnelmink/material.workspace-entity';
import { EquipmentWorkspaceEntity } from 'src/modules/funnelmink/equipment.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/modules/funnelmink/service.workspace-entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.activityTarget,
  namePlural: 'activityTargets',
  labelSingular: 'Activity Target',
  labelPlural: 'Activity Targets',
  description: 'An activity target',
  icon: 'IconCheckbox',
})
@WorkspaceIsSystem()
export class ActivityTargetWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.activity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Activity',
    description: 'ActivityTarget activity',
    icon: 'IconNotes',
    joinColumn: 'activityId',
    inverseSideTarget: () => ActivityWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  activity: Relation<ActivityWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.crew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'ActivityTarget crew',
    icon: STANDARD_ICONS.crew,
    joinColumn: 'crewId',
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  crews: Relation<CrewWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.material,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'ActivityTarget material',
    icon: STANDARD_ICONS.material,
    joinColumn: 'materialId',
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.equipment,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Equipment',
    description: 'ActivityTarget opportunity',
    icon: STANDARD_ICONS.equipment,
    joinColumn: 'equipmentId',
    inverseSideTarget: () => EquipmentWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  equipment: Relation<EquipmentWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.service,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'ActivityTarget service',
    icon: STANDARD_ICONS.service,
    joinColumn: 'serviceId',
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.job,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'ActivityTarget job',
    icon: STANDARD_ICONS.job,
    joinColumn: 'jobId',
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.workorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'ActivityTarget work order',
    icon: STANDARD_ICONS.workorder,
    joinColumn: 'workorderId',
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  workorder: Relation<WorkOrderWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.client,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Client',
    description: 'ActivityTarget client',
    icon: STANDARD_ICONS.client,
    joinColumn: 'clientId',
    inverseSideTarget: () => ClientWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  @WorkspaceIsNullable()
  client: Relation<ClientWorkspaceEntity>;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: ACTIVITY_TARGET_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `ActivityTarget ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'activityTargets',
  })
  custom: Relation<CustomWorkspaceEntity>;
}
