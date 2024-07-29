import { ActivityTargetWorkspaceEntity } from 'src/modules/activity/standard-objects/activity-target.workspace-entity';
import { ActivityWorkspaceEntity } from 'src/modules/activity/standard-objects/activity.workspace-entity';
import { ApiKeyWorkspaceEntity } from 'src/modules/api-key/standard-objects/api-key.workspace-entity';
import { AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { BlocklistWorkspaceEntity } from 'src/modules/connected-account/standard-objects/blocklist.workspace-entity';
import { CalendarEventWorkspaceEntity } from 'src/modules/calendar/standard-objects/calendar-event.workspace-entity';
import {
  CalendarChannelWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-channel.workspace-entity';
import {
  CalendarEventParticipantWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-event-participant.workspace-entity';
import { CommentWorkspaceEntity } from 'src/modules/activity/standard-objects/comment.workspace-entity';
import {
  ConnectedAccountWorkspaceEntity,
} from 'src/modules/connected-account/standard-objects/connected-account.workspace-entity';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { ViewFieldWorkspaceEntity } from 'src/modules/view/standard-objects/view-field.workspace-entity';
import { ViewFilterWorkspaceEntity } from 'src/modules/view/standard-objects/view-filter.workspace-entity';
import { ViewSortWorkspaceEntity } from 'src/modules/view/standard-objects/view-sort.workspace-entity';
import { ViewWorkspaceEntity } from 'src/modules/view/standard-objects/view.workspace-entity';
import { WebhookWorkspaceEntity } from 'src/modules/webhook/standard-objects/webhook.workspace-entity';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import {
  CalendarChannelEventAssociationWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-channel-event-association.workspace-entity';
import { AuditLogWorkspaceEntity } from 'src/modules/timeline/standard-objects/audit-log.workspace-entity';
import {
  TimelineActivityWorkspaceEntity,
} from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import {
  BehavioralEventWorkspaceEntity,
} from 'src/modules/timeline/standard-objects/behavioral-event.workspace-entity';
import {
  MessageChannelMessageAssociationWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity';
import {
  MessageChannelWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-channel.workspace-entity';
import {
  MessageParticipantWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-participant.workspace-entity';
import {
  MessageThreadWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-thread.workspace-entity';
import { MessageWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message.workspace-entity';
import { CrewWorkspaceEntity } from 'src/modules/funnelmink/crew.workspace-entity';
import { MaterialWorkspaceEntity } from 'src/modules/funnelmink/material.workspace-entity';
import { EquipmentWorkspaceEntity } from 'src/modules/funnelmink/equipment.workspace-entity';
import { ServiceWorkspaceEntity } from 'src/modules/funnelmink/service.workspace-entity';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import { WorkOrderWorkspaceEntity } from 'src/modules/funnelmink/workorder.workspace-entity';
import { JobWorkspaceEntity } from 'src/modules/funnelmink/job.workspace-entity';

export const standardObjectMetadataDefinitions = [
  ActivityTargetWorkspaceEntity,
  ActivityWorkspaceEntity,
  ApiKeyWorkspaceEntity,
  AuditLogWorkspaceEntity,
  AttachmentWorkspaceEntity,
  BehavioralEventWorkspaceEntity,
  BlocklistWorkspaceEntity,
  CalendarEventWorkspaceEntity,
  CalendarChannelWorkspaceEntity,
  CalendarChannelEventAssociationWorkspaceEntity,
  CalendarEventParticipantWorkspaceEntity,
  CommentWorkspaceEntity,
  ConnectedAccountWorkspaceEntity,
  FavoriteWorkspaceEntity,
  TimelineActivityWorkspaceEntity,
  ViewFieldWorkspaceEntity,
  ViewFilterWorkspaceEntity,
  ViewSortWorkspaceEntity,
  ViewWorkspaceEntity,
  WebhookWorkspaceEntity,
  WorkspaceMemberWorkspaceEntity,
  MessageThreadWorkspaceEntity,
  MessageWorkspaceEntity,
  MessageChannelWorkspaceEntity,
  MessageParticipantWorkspaceEntity,
  MessageChannelMessageAssociationWorkspaceEntity,

  // Funnelmink
  ClientWorkspaceEntity,
  CrewWorkspaceEntity,
  EquipmentWorkspaceEntity,
  JobWorkspaceEntity,
  MaterialWorkspaceEntity,
  ServiceWorkspaceEntity,
  WorkOrderWorkspaceEntity,
];
