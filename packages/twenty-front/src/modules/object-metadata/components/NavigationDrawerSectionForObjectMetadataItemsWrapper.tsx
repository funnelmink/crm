import { useRecoilValue } from 'recoil';
import { isDefined } from 'twenty-ui';

import { currentUserState } from '@/auth/states/currentUserState';
import { NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader } from '@/object-metadata/components/NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';
import { usePrefetchedData } from '@/prefetch/hooks/usePrefetchedData';
import { PrefetchKey } from '@/prefetch/types/PrefetchKey';
import { View } from '@/views/types/View';
import { FunnelminkNavigationDrawerSectionForObjectMetadataItems } from '~/funnelmink/FunnelminkNavigationDrawerSectionForObjectMetadataItems';

export const NavigationDrawerSectionForObjectMetadataItemsWrapper = ({
  isRemote,
}: {
  isRemote: boolean;
}) => {
  const currentUser = useRecoilValue(currentUserState);

  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();
  const filteredActiveObjectMetadataItems = activeObjectMetadataItems.filter(
    (item) => (isRemote ? item.isRemote : !item.isRemote),
  );

  const { records: views } = usePrefetchedData<View>(PrefetchKey.AllViews);
  const loading = useIsPrefetchLoading();

  if (loading && isDefined(currentUser)) {
    return <NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader />;
  }

  return (
    <FunnelminkNavigationDrawerSectionForObjectMetadataItems
      sectionTitle={isRemote ? 'Remote' : 'Workspace'}
      objectMetadataItems={filteredActiveObjectMetadataItems}
      views={views}
      isRemote={isRemote}
    />
  );
};
