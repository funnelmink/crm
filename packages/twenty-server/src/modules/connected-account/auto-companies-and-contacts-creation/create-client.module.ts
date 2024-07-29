import { Module } from '@nestjs/common';

import {
  ObjectMetadataRepositoryModule,
} from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { ClientWorkspaceEntity } from 'src/modules/funnelmink/client.workspace-entity';
import {
  CreateClientService,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-client.service';

@Module({
  imports: [
    ObjectMetadataRepositoryModule.forFeature([ClientWorkspaceEntity]),
  ],
  providers: [CreateClientService],
  exports: [CreateClientService],
})
export class CreateClientModule {
}
