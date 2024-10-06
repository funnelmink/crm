import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useIcons } from 'twenty-ui';

import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { NavigationDrawerSubItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSubItem';
import { getNavigationSubItemState } from '@/ui/navigation/navigation-drawer/utils/getNavigationSubItemState';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { getObjectMetadataItemViews } from '@/views/utils/getObjectMetadataItemViews';
import { useLastVisitedView } from '@/navigation/hooks/useLastVisitedView';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { View } from '@/views/types/View';

export const NavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  isRemote,
  views,
  objectMetadataItems,
}: {
  sectionTitle: string;
  isRemote: boolean;
  views: View[];
  objectMetadataItems: ObjectMetadataItem[];
}) => {
  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection(sectionTitle + (isRemote ? 'Remote' : 'Workspace'));
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  const { getIcon } = useIcons();
  const currentPath = useLocation().pathname;

  const { getLastVisitedViewIdFromObjectMetadataItemId } = useLastVisitedView();

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle
          label={sectionTitle}
          onClick={() => toggleNavigationSection()}
        />
        {isNavigationSectionOpen &&
          objectMetadataItems.map((objectMetadataItem) => {
            const objectMetadataViews = getObjectMetadataItemViews(
              objectMetadataItem.id,
              views,
            );
            const lastVisitedViewId =
              getLastVisitedViewIdFromObjectMetadataItemId(
                objectMetadataItem.id,
              );
            const viewId = lastVisitedViewId ?? objectMetadataViews[0]?.id;

            const navigationPath = `/objects/${objectMetadataItem.namePlural}${
              viewId ? `?view=${viewId}` : ''
            }`;

            const shouldSubItemsBeDisplayed =
              currentPath === `/objects/${objectMetadataItem.namePlural}` &&
              objectMetadataViews.length > 1;

            const sortedObjectMetadataViews = [...objectMetadataViews].sort(
              (viewA, viewB) =>
                viewA.key === 'INDEX' ? -1 : viewA.position - viewB.position,
            );

            const selectedSubItemIndex = sortedObjectMetadataViews.findIndex(
              (view) => viewId === view.id,
            );

            const subItemArrayLength = sortedObjectMetadataViews.length;

            return (
              <div key={objectMetadataItem.id}>
                <NavigationDrawerItem
                  label={objectMetadataItem.labelPlural}
                  to={navigationPath}
                  Icon={getIcon(objectMetadataItem.icon)}
                  active={
                    currentPath === `/objects/${objectMetadataItem.namePlural}`
                  }
                />
                {shouldSubItemsBeDisplayed &&
                  sortedObjectMetadataViews.map((view, index) => (
                    <NavigationDrawerSubItem
                      label={view.name}
                      to={`/objects/${objectMetadataItem.namePlural}?view=${view.id}`}
                      active={viewId === view.id}
                      subItemState={getNavigationSubItemState({
                        index,
                        arrayLength: subItemArrayLength,
                        selectedIndex: selectedSubItemIndex,
                      })}
                      Icon={getIcon(view.icon)}
                      key={view.id}
                    />
                  ))}
              </div>
            );
          })}
      </NavigationDrawerSection>
    )
  );
};
