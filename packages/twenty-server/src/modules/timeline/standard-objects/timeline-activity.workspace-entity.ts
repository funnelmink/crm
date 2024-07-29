import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  TIMELINE_ACTIVITY_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { STANDARD_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { CrewWorkspaceEntity } from 'src/modules/funnelmink/crew.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/modules/funnelmink/material.workspace-entity';
import { EquipmentWorkspaceEntity } from 'src/modules/funnelmink/equipment.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/modules/funnelmink/service.workspace-entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.timelineActivity,
  namePlural: 'timelineActivities',
  labelSingular: 'Timeline Activity',
  labelPlural: 'Timeline Activities',
  description: 'Aggregated / filtered event to be displayed on the timeline',
  icon: 'IconIconTimelineEvent',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class TimelineActivityWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.happensAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Creation date',
    description: 'Creation date',
    icon: 'IconCalendar',
    defaultValue: 'now',
  })
  happensAt: Date;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Event name',
    description: 'Event name',
    icon: 'IconAbc',
  })
  name: string;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.properties,
    type: FieldMetadataType.RAW_JSON,
    label: 'Event details',
    description: 'Json value for event details',
    icon: 'IconListDetails',
  })
  @WorkspaceIsNullable()
  properties: JSON;

  // Special objects that don't have their own timeline and are 'link' to the main object
  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedRecordCachedName,
    type: FieldMetadataType.TEXT,
    label: 'Linked Record cached name',
    description: 'Cached record name',
    icon: 'IconAbc',
  })
  linkedRecordCachedName: string;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedRecordId,
    type: FieldMetadataType.UUID,
    label: 'Linked Record id',
    description: 'Linked Record id',
    icon: 'IconAbc',
  })
  @WorkspaceIsNullable()
  linkedRecordId: string;

  @WorkspaceField({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.linkedObjectMetadataId,
    type: FieldMetadataType.UUID,
    label: 'Linked Object Metadata Id',
    description: 'inked Object Metadata Id',
    icon: 'IconAbc',
  })
  @WorkspaceIsNullable()
  linkedObjectMetadataId: string;

  // Who made the action
  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workspaceMember,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workspace Member',
    description: 'Event workspace member',
    icon: 'IconCircleUser',
    joinColumn: 'workspaceMemberId',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  workspaceMember: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.crew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'Event crew',
    icon: STANDARD_ICONS.crew,
    joinColumn: 'crewId',
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  person: Relation<CrewWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.material,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'Event material',
    icon: STANDARD_ICONS.material,
    joinColumn: 'materialId',
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.equipment,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Equipment',
    description: 'Event equipment',
    icon: STANDARD_ICONS.equipment,
    joinColumn: 'equipmentId',
    inverseSideTarget: () => EquipmentWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  equipment: Relation<EquipmentWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.service,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'Event service',
    icon: STANDARD_ICONS.service,
    joinColumn: 'serviceId',
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.job,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'Event job',
    icon: STANDARD_ICONS.job,
    joinColumn: 'jobId',
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.workorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'Event work order',
    icon: STANDARD_ICONS.workorder,
    joinColumn: 'workorderId',
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  workorder: Relation<WorkOrderWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.client,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Client',
    description: 'Event client',
    icon: STANDARD_ICONS.client,
    joinColumn: 'clientId',
    inverseSideTarget: () => ClientWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  @WorkspaceIsNullable()
  client: Relation<ClientWorkspaceEntity>;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: TIMELINE_ACTIVITY_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Event ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconTimeline',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'timelineActivities',
  })
  custom: Relation<CustomWorkspaceEntity>;
}
