import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  CLIENT_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { STANDARD_ICONS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { LinkMetadata } from 'src/engine/core-modules/calendar/dtos/timeline-calendar-event.dto';
import { CurrencyMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/currency.composite-type';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { TimelineActivityWorkspaceEntity } from '../timeline/standard-objects/timeline-activity.workspace-entity';
import { Relation } from 'typeorm';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { AttachmentWorkspaceEntity } from '../attachment/standard-objects/attachment.workspace-entity';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';
import {
  CalendarEventParticipantWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-event-participant.workspace-entity';
import {
  MessageParticipantWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-participant.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.client,
  namePlural: 'clients',
  labelSingular: 'Client',
  labelPlural: 'Clients',
  description: 'A Client',
  icon: STANDARD_ICONS.client,
})
export class ClientWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'Client’s name',
    icon: STANDARD_ICONS.client,
  })
  name: string;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'Client’s description',
    icon: STANDARD_ICONS.description,
  })
  description: string;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.domainName,
    type: FieldMetadataType.TEXT,
    label: 'Domain Name',
    description: 'The Client website URL. We use thi url to fetch their icon',
    icon: STANDARD_ICONS.domainName,
  })
  domainName?: string;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.address,
    type: FieldMetadataType.TEXT,
    label: 'Address',
    description: 'The Client address',
    icon: STANDARD_ICONS.address,
  })
  address: string;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.linkedinLink,
    type: FieldMetadataType.LINK,
    label: 'Linkedin',
    description: 'The Client Linkedin account',
    icon: STANDARD_ICONS.linkedinLink,
  })
  @WorkspaceIsNullable()
  linkedinLink: LinkMetadata;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.xLink,
    type: FieldMetadataType.LINK,
    label: 'X',
    description: 'The Client Twitter/X account',
    icon: STANDARD_ICONS.xLink,
  })
  @WorkspaceIsNullable()
  xLink: LinkMetadata;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.annualRecurringRevenue,
    type: FieldMetadataType.CURRENCY,
    label: 'ARR',
    description:
      'Annual Recurring Revenue: The Client\'s actual or estimated annual revenue',
    icon: STANDARD_ICONS.annualRecurringRevenue,
  })
  @WorkspaceIsNullable()
  annualRecurringRevenue: CurrencyMetadata;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.idealCustomerProfile,
    type: FieldMetadataType.BOOLEAN,
    label: 'ICP',
    description:
      'Ideal Customer Profile:  Indicates whether the Client is the most suitable and valuable customer for you',
    icon: STANDARD_ICONS.idealCustomerProfile,
    defaultValue: false,
  })
  idealCustomerProfile: boolean;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.POSITION,
    label: 'Position',
    description: 'Client record position',
    icon: STANDARD_ICONS.position,
  })
  @WorkspaceIsSystem()
  @WorkspaceIsNullable()
  position: number;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.calendarEventParticipants,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Calendar Event Participants',
    description: 'Calendar Event Participants',
    icon: STANDARD_ICONS.calendarEventParticipants,
    inverseSideTarget: () => CalendarEventParticipantWorkspaceEntity,
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsSystem()
  calendarEventParticipants: Relation<
    CalendarEventParticipantWorkspaceEntity[]
  >;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.avatarUrl,
    type: FieldMetadataType.TEXT,
    label: 'Avatar',
    description: 'Client’s avatar',
    icon: STANDARD_ICONS.avatarUrl,
  })
  @WorkspaceIsSystem()
  avatarUrl: string;

  @WorkspaceField({
    standardId: CLIENT_STANDARD_FIELD_IDS.email,
    type: FieldMetadataType.EMAIL,
    label: 'Email',
    description: 'Client’s email',
    icon: STANDARD_ICONS.email,
  })
  @WorkspaceIsNullable()
  email: string;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.accountOwner,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Account Owner',
    description:
      'Your team member responsible for managing the Client account',
    icon: STANDARD_ICONS.accountOwner,
    joinColumn: 'accountOwnerId',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'clients',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  accountOwner: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.activityTargets,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Activities',
    description: 'Activities tied to the Client',
    icon: STANDARD_ICONS.activityTargets,
    inverseSideTarget: () => ActivityTargetWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  activityTargets: Relation<ActivityTargetWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.workorders,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Work Orders',
    description: 'Work Orders linked to the company.',
    icon: STANDARD_ICONS.workorder,
    inverseSideTarget: () => WorkOrderWorkspaceEntity,
    inverseSideFieldKey: 'client',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsNullable()
  workorders: Relation<WorkOrderWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites linked to the company',
    icon: STANDARD_ICONS.favorite,
    inverseSideTarget: () => FavoriteWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  favorites: Relation<FavoriteWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.attachments,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Attachments',
    description: 'Attachments linked to the Client',
    icon: STANDARD_ICONS.attachments,
    inverseSideTarget: () => AttachmentWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  attachments: Relation<AttachmentWorkspaceEntity[]>;

  @WorkspaceRelation({
    standardId: CLIENT_STANDARD_FIELD_IDS.messageParticipants,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Message Participants',
    description: 'Message Participants',
    icon: STANDARD_ICONS.messageParticipants,
    inverseSideTarget: () => MessageParticipantWorkspaceEntity,
    inverseSideFieldKey: 'client',
    onDelete: RelationOnDeleteAction.SET_NULL,
  })
  @WorkspaceIsSystem()
  messageParticipants: Relation<MessageParticipantWorkspaceEntity[]>;

  @WorkspaceRelation({
    description: 'Timeline Activities linked to the Client',
    icon: STANDARD_ICONS.timelineActivities,
    inverseSideTarget: () => TimelineActivityWorkspaceEntity,
    label: 'Timeline Activities',
    onDelete: RelationOnDeleteAction.CASCADE,
    standardId: CLIENT_STANDARD_FIELD_IDS.timelineActivities,
    type: RelationMetadataType.ONE_TO_MANY,
  })
  @WorkspaceIsNullable()
  @WorkspaceIsSystem()
  timelineActivities: Relation<TimelineActivityWorkspaceEntity[]>;
}
