import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceGate } from 'src/engine/twenty-orm/decorators/workspace-gate.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { FAVORITE_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import { NoteWorkspaceEntity } from 'src/modules/note/standard-objects/note.workspace-entity';
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { TaskWorkspaceEntity } from 'src/modules/task/standard-objects/task.workspace-entity';
import { ViewWorkspaceEntity } from 'src/modules/view/standard-objects/view.workspace-entity';
import { WorkflowWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow.workspace-entity';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { JobWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-job.workspace-entity';
import { FUNNELMINK_IDS } from 'src/funnelmink/funnelmink-server-constants';
import { MaterialWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-material.workspace-entity';
import { CrewWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-crew.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-service.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-workorder.workspace-entity';

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
    inverseSideFieldKey: 'favorites',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
  })
  @WorkspaceIsNullable()
  workspaceMember: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceJoinColumn('workspaceMember')
  workspaceMemberId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'Favorite person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'Favorite company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'Favorite opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.workflow,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workflow',
    description: 'Favorite workflow',
    icon: 'IconSettingsAutomation',
    inverseSideTarget: () => WorkflowWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
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
  workflowId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.task,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Task',
    description: 'Favorite task',
    icon: 'IconCheckbox',
    inverseSideTarget: () => TaskWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  task: Relation<TaskWorkspaceEntity> | null;

  @WorkspaceJoinColumn('task')
  taskId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.note,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Note',
    description: 'Favorite note',
    icon: 'IconNotes',
    inverseSideTarget: () => NoteWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  note: Relation<NoteWorkspaceEntity> | null;

  @WorkspaceJoinColumn('note')
  noteId: string;

  @WorkspaceRelation({
    standardId: FAVORITE_STANDARD_FIELD_IDS.view,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'View',
    description: 'Favorite view',
    icon: 'IconLayoutCollage',
    inverseSideTarget: () => ViewWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  view: Relation<ViewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('view')
  viewId: string;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: FAVORITE_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `Favorite ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconHeart',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // Funnelmink
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.favoriteWorkOrder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'Favorite Work Order',
    icon: FUNNELMINK_IDS.workOrder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  workOrder: Relation<WorkOrderWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workOrder')
  workOrderId: string;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.favoriteService,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'Favorite Service',
    icon: FUNNELMINK_IDS.service,
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity> | null;

  @WorkspaceJoinColumn('service')
  serviceId: string;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.favoriteCrew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'Favorite Crew',
    icon: FUNNELMINK_IDS.crew,
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('crew')
  crewId: string;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.favoriteMaterial,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'Favorite Material',
    icon: FUNNELMINK_IDS.material,
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity> | null;

  @WorkspaceJoinColumn('material')
  materialId: string;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.favoriteJob,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'Favorite Job',
    icon: FUNNELMINK_IDS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'favorites',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity> | null;

  @WorkspaceJoinColumn('job')
  jobId: string;
}
