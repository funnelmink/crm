import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ObjectMetadataRepositoryModule,
} from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import {
  WorkspaceMemberWorkspaceEntity,
} from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import {
  CalendarEventParticipantWorkspaceEntity,
} from 'src/modules/calendar/standard-objects/calendar-event-participant.workspace-entity';
import {
  CalendarEventParticipantModule,
} from 'src/modules/calendar/services/calendar-event-participant/calendar-event-participant.module';
import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { MessagingCommonModule } from 'src/modules/messaging/common/messaging-common.module';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import {
  CreateClientModule,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-client.module';
import {
  CreateClientService,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-client.service';

@Module({
  imports: [
    CreateClientModule,
    ObjectMetadataRepositoryModule.forFeature([
      ClientWorkspaceEntity,
      WorkspaceMemberWorkspaceEntity,
      CalendarEventParticipantWorkspaceEntity,
    ]),
    MessagingCommonModule,
    WorkspaceDataSourceModule,
    CalendarEventParticipantModule,
    TypeOrmModule.forFeature([FeatureFlagEntity], 'core'),
  ],
  providers: [CreateClientService],
  exports: [CreateClientService],
})
export class AutoClientsCreationModule {
}
