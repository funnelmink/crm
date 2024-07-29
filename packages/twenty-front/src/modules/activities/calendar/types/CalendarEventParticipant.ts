import { WorkspaceMember } from '~/generated-metadata/graphql';
import { Client } from '@/funnelmink/Client';

export type CalendarEventParticipant = {
  id: string;
  handle: string;
  isOrganizer: boolean;
  displayName: string;
  client?: Client;
  workspaceMember?: WorkspaceMember;
  responseStatus: 'ACCEPTED' | 'DECLINED' | 'NEEDS_ACTION' | 'TENTATIVE';
};
