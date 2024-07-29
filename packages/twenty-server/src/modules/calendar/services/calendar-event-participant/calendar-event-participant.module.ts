import { Module } from '@nestjs/common';

import {
  ObjectMetadataRepositoryModule,
} from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import {
  CalendarEventParticipantService,
} from 'src/modules/calendar/services/calendar-event-participant/calendar-event-participant.service';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import {
  AddClientIdAndWorkspaceMemberIdModule,
} from 'src/modules/calendar-messaging-participant/services/add-client-id-and-workspace-member-id/add-client-id-and-workspace-member-id.module';

@Module({
  imports: [
    WorkspaceDataSourceModule,
    ObjectMetadataRepositoryModule.forFeature([ClientWorkspaceEntity]),
    AddClientIdAndWorkspaceMemberIdModule,
  ],
  providers: [CalendarEventParticipantService],
  exports: [CalendarEventParticipantService],
})
export class CalendarEventParticipantModule {
}
