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

  // Relations
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
}
