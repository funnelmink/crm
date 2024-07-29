import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  ATTACHMENT_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { ActivityWorkspaceEntity } from 'src/modules/activity/standard-objects/activity.workspace-entity';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { STANDARD_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { CrewWorkspaceEntity } from 'src/modules/funnelmink/crew.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/modules/funnelmink/material.workspace-entity';
import { EquipmentWorkspaceEntity } from 'src/modules/funnelmink/equipment.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/modules/funnelmink/service.workspace-entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.attachment,
  namePlural: 'attachments',
  labelSingular: 'Attachment',
  labelPlural: 'Attachments',
  description: 'An attachment',
  icon: 'IconFileImport',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class AttachmentWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'Attachment name',
    icon: 'IconFileUpload',
  })
  name: string;

  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.fullPath,
    type: FieldMetadataType.TEXT,
    label: 'Full path',
    description: 'Attachment full path',
    icon: 'IconLink',
  })
  fullPath: string;

  @WorkspaceField({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.type,
    type: FieldMetadataType.TEXT,
    label: 'Type',
    description: 'Attachment type',
    icon: 'IconList',
  })
  type: string;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.author,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Author',
    description: 'Attachment author',
    icon: 'IconCircleUser',
    joinColumn: 'authorId',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'authoredAttachments',
  })
  author: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.activity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Activity',
    description: 'Attachment activity',
    icon: 'IconNotes',
    joinColumn: 'activityId',
    inverseSideTarget: () => ActivityWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  activity: Relation<ActivityWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.crew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'Attachment crew',
    icon: STANDARD_ICONS.crew,
    joinColumn: 'crewId',
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.material,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'Attachment material',
    icon: STANDARD_ICONS.material,
    joinColumn: 'materialId',
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.equipment,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Equipment',
    description: 'Attachment equipment',
    icon: STANDARD_ICONS.equipment,
    joinColumn: 'equipmentId',
    inverseSideTarget: () => EquipmentWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  equipment: Relation<EquipmentWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.service,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'Attachment service',
    icon: STANDARD_ICONS.service,
    joinColumn: 'serviceId',
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.job,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'Attachment job',
    icon: STANDARD_ICONS.job,
    joinColumn: 'jobId',
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: ATTACHMENT_STANDARD_FIELD_IDS.workorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'Attachment work order',
    icon: STANDARD_ICONS.workorder,
    joinColumn: 'workorderId',
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  @WorkspaceIsNullable()
  workorder: Relation<WorkOrderWorkspaceEntity>;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: ATTACHMENT_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Attachment ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'attachments',
  })
  custom: Relation<CustomWorkspaceEntity>;
}
