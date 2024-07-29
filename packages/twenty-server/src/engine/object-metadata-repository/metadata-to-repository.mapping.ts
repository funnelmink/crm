import {
  CalendarChannelEventAssociationRepository,
} from 'src/modules/calendar/repositories/calendar-channel-event-association.repository';
import { CalendarChannelRepository } from 'src/modules/calendar/repositories/calendar-channel.repository';
import {
  CalendarEventParticipantRepository,
} from 'src/modules/calendar/repositories/calendar-event-participant.repository';
import { CalendarEventRepository } from 'src/modules/calendar/repositories/calendar-event.repository';
import { BlocklistRepository } from 'src/modules/connected-account/repositories/blocklist.repository';
import { ConnectedAccountRepository } from 'src/modules/connected-account/repositories/connected-account.repository';
import { AuditLogRepository } from 'src/modules/timeline/repositiories/audit-log.repository';
import { TimelineActivityRepository } from 'src/modules/timeline/repositiories/timeline-activity.repository';
import { WorkspaceMemberRepository } from 'src/modules/workspace-member/repositories/workspace-member.repository';
import { AttachmentRepository } from 'src/modules/attachment/repositories/attachment.repository';
import { CommentRepository } from 'src/modules/activity/repositories/comment.repository';
import {
  MessageChannelMessageAssociationRepository,
} from 'src/modules/messaging/common/repositories/message-channel-message-association.repository';
import { MessageChannelRepository } from 'src/modules/messaging/common/repositories/message-channel.repository';
import { MessageParticipantRepository } from 'src/modules/messaging/common/repositories/message-participant.repository';
import { MessageThreadRepository } from 'src/modules/messaging/common/repositories/message-thread.repository';
import { MessageRepository } from 'src/modules/messaging/common/repositories/message.repository';
import { ClientRepository } from 'src/modules/funnelmink/client.repository';
import { CrewRepository } from 'src/modules/funnelmink/crew.repository';
import { EquipmentRepository } from 'src/modules/funnelmink/equipment.repository';
import { JobRepository } from 'src/modules/funnelmink/job.repository';
import { MaterialRepository } from 'src/modules/funnelmink/material.repository';
import { ServiceRepository } from 'src/modules/funnelmink/service.repository';
import { WorkOrderRepository } from 'src/modules/funnelmink/workorder.repository';

export const metadataToRepositoryMapping = {
  AuditLogWorkspaceEntity: AuditLogRepository,
  BlocklistWorkspaceEntity: BlocklistRepository,
  CalendarChannelEventAssociationWorkspaceEntity:
  CalendarChannelEventAssociationRepository,
  CalendarChannelWorkspaceEntity: CalendarChannelRepository,
  CalendarEventParticipantWorkspaceEntity: CalendarEventParticipantRepository,
  CalendarEventWorkspaceEntity: CalendarEventRepository,
  ConnectedAccountWorkspaceEntity: ConnectedAccountRepository,
  MessageChannelMessageAssociationWorkspaceEntity:
  MessageChannelMessageAssociationRepository,
  MessageChannelWorkspaceEntity: MessageChannelRepository,
  MessageWorkspaceEntity: MessageRepository,
  MessageParticipantWorkspaceEntity: MessageParticipantRepository,
  MessageThreadWorkspaceEntity: MessageThreadRepository,
  TimelineActivityWorkspaceEntity: TimelineActivityRepository,
  WorkspaceMemberWorkspaceEntity: WorkspaceMemberRepository,
  AttachmentWorkspaceEntity: AttachmentRepository,
  CommentWorkspaceEntity: CommentRepository,

  // Funnelmink
  ClientWorkspaceEntity: ClientRepository,
  CrewWorkspaceEntity: CrewRepository,
  EquipmentWorkspaceEntity: EquipmentRepository,
  JobWorkspaceEntity: JobRepository,
  MaterialWorkspaceEntity: MaterialRepository,
  ServiceWorkspaceEntity: ServiceRepository,
  WorkOrderWorkspaceEntity: WorkOrderRepository,
};
