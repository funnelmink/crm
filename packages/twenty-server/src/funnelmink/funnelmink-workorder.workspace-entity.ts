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
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';

@WorkspaceEntity({
  standardId: FUNNELMINK_IDS.workorder,
  namePlural: 'workorders',
  labelSingular: 'Work Order',
  labelPlural: 'Work Orders',
  description: 'A Work Order',
  icon: FUNNELMINK_ICONS.workorder,
  labelIdentifierStandardId: FUNNELMINK_IDS.workorderName,
  softDelete: true,
})
export class WorkOrderWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workorderName,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Work Order name',
    icon: FUNNELMINK_ICONS.workorder,
  })
  name: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workorderCreatedBy,
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

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.workorderPosition,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Work Order record position',
    icon: FUNNELMINK_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  // Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderCompany,
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

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderActivityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'The Activities tied to this Work Order',
    icon: FUNNELMINK_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  activityTargets: Relation<ActivityTargetWorkspaceEntity>[];

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderNoteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the Work Order',
    icon: FUNNELMINK_ICONS.notes,
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderFavorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Work Order',
    icon: FUNNELMINK_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderAttachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Work Order',
    icon: FUNNELMINK_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.workorderTimelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Work Order',
    icon: FUNNELMINK_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    inverseSideFieldKey: 'workorder',
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
