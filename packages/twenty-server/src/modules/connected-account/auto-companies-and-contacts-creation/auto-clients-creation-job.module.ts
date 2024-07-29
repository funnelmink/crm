import { Module } from '@nestjs/common';

import {
  AutoClientsCreationModule,
} from 'src/modules/connected-account/auto-companies-and-contacts-creation/auto-clients-creation.module';

@Module({
  imports: [AutoClientsCreationModule],
  providers: [
    {
      provide: AutoClientsCreationModule.name,
      useClass: AutoClientsCreationModule,
    },
  ],
})
export class AutoClientsCreationJobModule {
}
