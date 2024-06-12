import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';
import { User, Workspace } from '~/generated/graphql';

type MockedUser = Pick<
  User,
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'canImpersonate'
  | '__typename'
  | 'supportUserHash'
  | 'onboardingStep'
> & {
  workspaceMember: WorkspaceMember | null;
  locale: string;
  defaultWorkspace: Workspace;
  workspaces: Array<{ workspace: Workspace }>;
};

export const avatarUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAYABgAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABgAAAAAQAAAGAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAABQAAAAA/8AAEQgAFAAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMACwgICggHCwoJCg0MCw0RHBIRDw8RIhkaFBwpJCsqKCQnJy0yQDctMD0wJyc4TDk9Q0VISUgrNk9VTkZUQEdIRf/bAEMBDA0NEQ8RIRISIUUuJy5FRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRf/dAAQAAv/aAAwDAQACEQMRAD8Ava1q728otYY98joSCTgZrnbXWdTtrhrfVZXWLafmcAEkdgR/hVltQku9Q8+OIEBcGOT+ID0PY1ka1KH2u8ToqnPLbmIqG7u6LtbQ7RXBRec4Uck9eKXcPWsKDWVnhWSL5kYcFelSf2m3901POh8jP//QoyIAnTuKpXsY82NsksUyWPU5q/L9z8RVK++/F/uCsVsaEURwgA4HtT9x9TUcf3KfUGh//9k=';
export const workspaceLogoUrl =
  'data:image/png;base64,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';

export const mockDefaultWorkspace: Workspace = {
  id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6w',
  displayName: 'Twenty',
  domainName: 'twenty.com',
  inviteHash: 'twenty.com-invite-hash',
  logo: workspaceLogoUrl,
  allowImpersonation: true,
  subscriptionStatus: 'active',
  activationStatus: 'active',
  featureFlags: [
    {
      id: '1492de61-5018-4368-8923-4f1eeaf988c4',
      key: 'IS_AIRTABLE_INTEGRATION_ENABLED',
      value: true,
      workspaceId: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6w',
    },
    {
      id: '1492de61-5018-4368-8923-4f1eeaf988c5',
      key: 'IS_POSTGRESQL_INTEGRATION_ENABLED',
      value: true,
      workspaceId: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6w',
    },
    {
      id: '1492de61-5018-4368-8923-4f1eeaf988c6',
      key: 'IS_CALENDER_ENABLED',
      value: true,
      workspaceId: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6w',
    },
  ],
  createdAt: '2023-04-26T10:23:42.33625+00:00',
  updatedAt: '2023-04-26T10:23:42.33625+00:00',
  currentCacheVersion: '1',
  currentBillingSubscription: {
    __typename: 'BillingSubscription',
    id: '7efbc3f7-6e5e-4128-957e-8d86808cdf6a',
    interval: 'month',
    status: 'active',
  },
};

export const mockedWorkspaceMemberData: WorkspaceMember = {
  __typename: 'WorkspaceMember',
  id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6b',
  colorScheme: 'Light',
  avatarUrl,
  locale: 'en',
  name: {
    firstName: 'Charles',
    lastName: 'Test',
  },
  createdAt: '2023-04-26T10:23:42.33625+00:00',
  updatedAt: '2023-04-26T10:23:42.33625+00:00',
  userId: '2603c1f9-0172-4ea6-986c-eeaccdf7f4cf',
  userEmail: 'charles@test.com',
};

export const mockedUsersData: Array<MockedUser> = [
  {
    id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6d',
    __typename: 'User',
    email: 'charles@test.com',
    firstName: 'Charles',
    lastName: 'Test',
    canImpersonate: false,
    supportUserHash:
      'a95afad9ff6f0b364e2a3fd3e246a1a852c22b6e55a3ca33745a86c201f9c10d',
    workspaceMember: mockedWorkspaceMemberData,
    defaultWorkspace: mockDefaultWorkspace,
    locale: 'en',
    workspaces: [{ workspace: mockDefaultWorkspace }],
    onboardingStep: null,
  },
  {
    id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6c',
    __typename: 'User',
    email: 'felix@test.com',
    firstName: 'Felix',
    lastName: 'Test',
    canImpersonate: false,
    supportUserHash:
      '54ac3986035961724cdb9a7a30c70e6463a4b68f0ecd2014c727171a82144b74',
    workspaceMember: {
      ...mockedWorkspaceMemberData,
      id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6c',
      name: {
        firstName: 'Felix',
        lastName: 'Test',
      },
      userId: '81aeb270-d689-4515-bd5d-35dbe956da3b',
    },
    defaultWorkspace: mockDefaultWorkspace,
    locale: 'en',
    workspaces: [{ workspace: mockDefaultWorkspace }],
    onboardingStep: null,
  },
];

export const mockedOnboardingUsersData: Array<MockedUser> = [
  {
    id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6d',
    __typename: 'User',
    email: 'workspace-onboarding@test.com',
    firstName: '',
    lastName: '',
    canImpersonate: false,
    supportUserHash:
      '4fb61d34ed3a4aeda2476d4b308b5162db9e1809b2b8277e6fdc6efc4a609254',
    workspaceMember: {
      ...mockedWorkspaceMemberData,
      id: 'd454f075-c72f-4ebe-bac7-d28e75e74a23',
      name: {
        firstName: '',
        lastName: '',
      },

      userId: '7f793378-b939-43b7-8642-292c9510754c',
    },
    defaultWorkspace: mockDefaultWorkspace,
    locale: 'en',
    workspaces: [{ workspace: mockDefaultWorkspace }],
    onboardingStep: null,
  },
  {
    id: '7dfbc3f7-6e5e-4128-957e-8d86808cdf6d',
    __typename: 'User',
    email: 'profile-onboarding@test.com',
    firstName: '',
    lastName: '',
    canImpersonate: false,
    workspaceMember: null,
    defaultWorkspace: {
      ...mockDefaultWorkspace,
      activationStatus: 'inactive',
    },
    locale: 'en',
    workspaces: [{ workspace: mockDefaultWorkspace }],
    onboardingStep: null,
  },
];
