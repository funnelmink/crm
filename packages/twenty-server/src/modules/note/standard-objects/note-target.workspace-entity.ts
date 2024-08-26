import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceGate } from 'src/engine/twenty-orm/decorators/workspace-gate.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { NOTE_TARGET_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import { NoteWorkspaceEntity } from 'src/modules/note/standard-objects/note.workspace-entity';
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { WorkflowWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow.workspace-entity';
import {
  FUNNELMINK_ICONS,
  FUNNELMINK_IDS,
} from 'src/funnelmink/funnelmink-server-constants';
import { WorkOrderWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-workorder.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-service.workspace-entity';
import { CrewWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-crew.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-material.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.noteTarget,
  namePlural: 'noteTargets',
  labelSingular: 'Note Target',
  labelPlural: 'Note Targets',
  description: 'A note target',
  icon: 'IconCheckbox',
  softDelete: true,
})
@WorkspaceIsSystem()
export class NoteTargetWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.note,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Note',
    description: 'NoteTarget note',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  note: Relation<NoteWorkspaceEntity> | null;

  @WorkspaceJoinColumn('note')
  noteId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'NoteTarget person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'NoteTarget company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'NoteTarget opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: NOTE_TARGET_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `NoteTarget ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  custom: Relation<CustomWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: NOTE_TARGET_STANDARD_FIELD_IDS.workflow,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workflow',
    description: 'Note workflow',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => WorkflowWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  @WorkspaceIsNullable()
  workflow: Relation<WorkflowWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workflow')
  @WorkspaceGate({
    featureFlag: FeatureFlagKey.IsWorkflowEnabled,
  })
  workflowId: string | null;

  // Funnelmink
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.noteWorkorder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'NoteTarget Work Order',
    icon: FUNNELMINK_ICONS.workOrder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  workOrder: Relation<WorkOrderWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workOrder')
  workOrderId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.noteService,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'NoteTarget Service',
    icon: FUNNELMINK_ICONS.service,
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity> | null;

  @WorkspaceJoinColumn('service')
  serviceId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.noteCrew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'NoteTarget Crew',
    icon: FUNNELMINK_ICONS.service,
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('crew')
  crewId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.noteMaterial,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'NoteTarget Material',
    icon: FUNNELMINK_ICONS.material,
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'noteTargets',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity> | null;

  @WorkspaceJoinColumn('material')
  materialId: string | null;
}
