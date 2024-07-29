import { Module } from '@nestjs/common';

import {
  ObjectMetadataRepositoryModule,
} from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import {
  AddClientIdAndWorkspaceMemberIdService,
} from 'src/modules/calendar-messaging-participant/services/add-client-id-and-workspace-member-id/add-client-id-and-workspace-member-id.service';

@Module({
  imports: [
    WorkspaceDataSourceModule,
    ObjectMetadataRepositoryModule.forFeature([ClientWorkspaceEntity]),
  ],
  providers: [AddClientIdAndWorkspaceMemberIdService],
  exports: [AddClientIdAndWorkspaceMemberIdService],
})
export class AddClientIdAndWorkspaceMemberIdModule {
}
