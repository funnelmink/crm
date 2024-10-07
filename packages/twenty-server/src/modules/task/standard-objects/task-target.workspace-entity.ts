import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { CustomWorkspaceEntity } from 'src/engine/twenty-orm/custom.workspace-entity';
import { WorkspaceDynamicRelation } from 'src/engine/twenty-orm/decorators/workspace-dynamic-relation.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { TASK_TARGET_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { TaskWorkspaceEntity } from 'src/modules/task/standard-objects/task.workspace-entity';
import {
  FUNNELMINK_ICONS,
  FUNNELMINK_IDS,
} from 'src/funnelmink/funnelmink-server-constants';
import { WorkOrderWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-workorder.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-service.workspace-entity';
import { CrewWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-crew.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-material.workspace-entity';
import { JobWorkspaceEntity } from 'src/funnelmink/entities/funnelmink-job.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.taskTarget,
  namePlural: 'taskTargets',
  labelSingular: 'Task Target',
  labelPlural: 'Task Targets',
  description: 'An task target',
  icon: 'IconCheckbox',
})
@WorkspaceIsSystem()
export class TaskTargetWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.task,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Task',
    description: 'TaskTarget task',
    icon: 'IconCheckbox',
    inverseSideTarget: () => TaskWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  task: Relation<TaskWorkspaceEntity> | null;

  @WorkspaceJoinColumn('task')
  taskId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'TaskTarget person',
    icon: 'IconUser',
    inverseSideTarget: () => PersonWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonWorkspaceEntity> | null;

  @WorkspaceJoinColumn('person')
  personId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.company,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Company',
    description: 'TaskTarget company',
    icon: 'IconBuildingSkyscraper',
    inverseSideTarget: () => CompanyWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  company: Relation<CompanyWorkspaceEntity> | null;

  @WorkspaceJoinColumn('company')
  companyId: string | null;

  @WorkspaceRelation({
    standardId: TASK_TARGET_STANDARD_FIELD_IDS.opportunity,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Opportunity',
    description: 'TaskTarget opportunity',
    icon: 'IconTargetArrow',
    inverseSideTarget: () => OpportunityWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  opportunity: Relation<OpportunityWorkspaceEntity> | null;

  @WorkspaceJoinColumn('opportunity')
  opportunityId: string | null;

  @WorkspaceDynamicRelation({
    type: RelationMetadataType.MANY_TO_ONE,
    argsFactory: (oppositeObjectMetadata) => ({
      standardId: TASK_TARGET_STANDARD_FIELD_IDS.custom,
      name: oppositeObjectMetadata.nameSingular,
      label: oppositeObjectMetadata.labelSingular,
      description: `TaskTarget ${oppositeObjectMetadata.labelSingular}`,
      joinColumn: `${oppositeObjectMetadata.nameSingular}Id`,
      icon: 'IconBuildingSkyscraper',
    }),
    inverseSideTarget: () => CustomWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  custom: Relation<CustomWorkspaceEntity>;

  // Funnelmink
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.taskWorkOrder,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Work Order',
    description: 'TaskTarget Work Order',
    icon: FUNNELMINK_ICONS.workOrder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  workOrder: Relation<WorkOrderWorkspaceEntity> | null;

  @WorkspaceJoinColumn('workOrder')
  workOrderId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.taskService,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Service',
    description: 'TaskTarget Service',
    icon: FUNNELMINK_ICONS.service,
    inverseSideTarget: () => ServiceWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  service: Relation<ServiceWorkspaceEntity> | null;

  @WorkspaceJoinColumn('service')
  serviceId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.taskCrew,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Crew',
    description: 'TaskTarget Crew',
    icon: FUNNELMINK_ICONS.crew,
    inverseSideTarget: () => CrewWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  crew: Relation<CrewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('crew')
  crewId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.taskMaterial,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Material',
    description: 'TaskTarget Material',
    icon: FUNNELMINK_ICONS.material,
    inverseSideTarget: () => MaterialWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  material: Relation<MaterialWorkspaceEntity> | null;

  @WorkspaceJoinColumn('material')
  materialId: string | null;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.taskJob,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Job',
    description: 'TaskTarget Job',
    icon: FUNNELMINK_ICONS.job,
    inverseSideTarget: () => JobWorkspaceEntity,
    inverseSideFieldKey: 'taskTargets',
  })
  @WorkspaceIsNullable()
  job: Relation<JobWorkspaceEntity> | null;

  @WorkspaceJoinColumn('job')
  jobId: string | null;
}
