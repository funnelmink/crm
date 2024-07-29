import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  FAVORITE_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
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
  standardId: STANDARD_OBJECT_IDS.favorite,
  namePlural: 'favorites',
  labelSingular: 'Favorite',
  labelPlural: 'Favorites',
  description: 'A favorite',
  icon: 'IconHeart',
})
@WorkspaceIsNotAuditLogged()
@WorkspaceIsSystem()
export class FavoriteWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FAVORITE_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.NUMBER,
    label: 'Position',
    description: 'Favorite position',
    icon: 'IconList',
    defaultValue: 0,
  })
  position: number;

  // Relations
  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.workspaceMember,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workspace Member',
    description: 'Favorite workspace member',
    icon: 'IconCircleUser',
    joinColumn: 'workspaceMemberId',
    inverseSideFieldKey: 'favorites',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
  })
  workspaceMember: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.crew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'Favorite crew',
    icon: STANDARD_ICONS.crew,
    joinColumn: 'crewId',
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.material,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'Favorite material',
    icon: STANDARD_ICONS.material,
    joinColumn: 'materialId',
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.equipment,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Equipment',
    description: 'Favorite equipment',
    icon: STANDARD_ICONS.equipment,
    joinColumn: 'equipmentId',
    inverseSideTarget: () => EquipmentWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  equipment: Relation<EquipmentWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.service,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'Favorite service',
    icon: STANDARD_ICONS.service,
    joinColumn: 'serviceId',
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.job,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'Favorite job',
    icon: STANDARD_ICONS.job,
    joinColumn: 'jobId',
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.workorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workorder',
    description: 'Favorite workorder',
    icon: STANDARD_ICONS.workorder,
    joinColumn: 'workorderId',
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  workorder: Relation<WorkOrderWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.client,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Client',
    description: 'Favorite client',
    icon: STANDARD_ICONS.client,
    joinColumn: 'clientId',
    inverseSideTarget: () => ClientWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  client: Relation<ClientWorkspaceEntity>;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: FAVORITE_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Favorite ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  custom: Relation<CustomWorkspaceEntity>;
}
