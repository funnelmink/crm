import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useIcons } from 'twenty-ui';

import { ObjectMetadataNavItemsSkeletonLoader } from '@/object-metadata/components/ObjectMetadataNavItemsSkeletonLoader';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';
import { usePrefetchedData } from '@/prefetch/hooks/usePrefetchedData';
import { PrefetchKey } from '@/prefetch/types/PrefetchKey';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { View } from '@/views/types/View';
import { getObjectMetadataItemViews } from '@/views/utils/getObjectMetadataItemViews';

export const ObjectMetadataNavItems = ({ isRemote }: { isRemote: boolean }) => {
  const { isNavigationSectionOpenState } = useNavigationSection(
    'Objects' + (isRemote ? 'Remote' : 'Workspace'),
  );
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();
  const filteredActiveObjectMetadataItems = activeObjectMetadataItems.filter(
    (item) => (isRemote ? item.isRemote : !item.isRemote),
  );
  const { getIcon } = useIcons();
  const currentPath = useLocation().pathname;

  const { records: views } = usePrefetchedData<View>(PrefetchKey.AllViews);
  const loading = useIsPrefetchLoading();

  if (loading) {
    return <ObjectMetadataNavItemsSkeletonLoader />;
  }

  type SectionItems = {
    [key: string]: string[];
  };

  const sectionItems: SectionItems = {
    CRM: ['Companies', 'People', 'Opportunities'],
    Scheduling: ['Crews', 'Jobs'],
    Billing: ['Work Orders', 'Materials', 'Services'],
  };

  const categorizedItems = Object.keys(sectionItems).reduce(
    (acc, section) => {
      acc[section] = filteredActiveObjectMetadataItems.filter(
        (item) => sectionItems[section].includes(item.labelPlural), // TS7053: Element implicitly has an any type because expression of type string can't be used to index type
      );
      return acc;
    },
    {} as Record<string, typeof filteredActiveObjectMetadataItems>,
  );

  const customItems = filteredActiveObjectMetadataItems.filter(
    (item) => !Object.values(sectionItems).flat().includes(item.labelPlural),
  );

  const renderSection = (
    section: string,
    items: typeof filteredActiveObjectMetadataItems,
  ) =>
    items.length > 0 && (
      <div key={section}>
        <NavigationDrawerSectionTitle label={section} />
        {items
          .sort((a, b) => a.labelPlural.localeCompare(b.labelPlural))
          .map((item) => {
            const objectMetadataViews = getObjectMetadataItemViews(
              item.id,
              views,
            );
            const viewId = objectMetadataViews[0]?.id;

            const navigationPath = `/objects/${item.namePlural}${
              viewId ? `?view=${viewId}` : ''
            }`;

            return (
              <NavigationDrawerItem
                key={item.id}
                label={item.labelPlural}
                to={navigationPath}
                active={currentPath === `/objects/${item.namePlural}`}
                Icon={getIcon(item.icon)}
              />
            );
          })}
      </div>
    );

  return (
    <>
      {isNavigationSectionOpen && (
        <>
          {Object.keys(categorizedItems).map((section) =>
            renderSection(section, categorizedItems[section]),
          )}
          {customItems.length > 0 && renderSection('Custom', customItems)}
          {isRemote &&
            renderSection('Remote', filteredActiveObjectMetadataItems)}
        </>
      )}
    </>
  );
};
