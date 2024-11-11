import { Relation } from 'typeorm';

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
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';

// fm TODO: supplier, quantity, unitType, unitCost, defaultUnitPrice (probably not these exact things, but you get the idea)
@WorkspaceEntity({
  standardId: FUNNELMINK_IDS.service,
  namePlural: 'services',
  labelSingular: 'Service',
  labelPlural: 'Services',
  description: 'A Service',
  icon: FUNNELMINK_ICONS.service,
  labelIdentifierStandardId: FUNNELMINK_IDS.serviceName,
})
export class ServiceWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FUNNELMINK_IDS.serviceName,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'The Service name',
    icon: FUNNELMINK_ICONS.service,
  })
  name: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.serviceDescription,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'The Service description',
    icon: FUNNELMINK_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: FUNNELMINK_IDS.serviceCreatedBy,
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
    standardId: FUNNELMINK_IDS.servicePosition,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Service record position',
    icon: FUNNELMINK_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  // First-class Relations
  // TODO: job (need many-to-many)

  // Second-class Relations
  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.serviceTaskTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Tasks',
    description: 'Tasks tied to the Service',
    icon: FUNNELMINK_ICONS.tasks,
    inverseSideTarget: () => TaskTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  taskTargets: Relation<TaskTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.serviceNoteTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Notes',
    description: 'Notes tied to the Service',
    icon: FUNNELMINK_ICONS.notes,
    inverseSideTarget: () => NoteTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  noteTargets: Relation<NoteTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.serviceFavorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the Service',
    icon: FUNNELMINK_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.serviceAttachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Service',
    icon: FUNNELMINK_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: FUNNELMINK_IDS.serviceTimelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Timeline Activities',
    description: 'Timeline Activities linked to the Service',
    icon: FUNNELMINK_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
