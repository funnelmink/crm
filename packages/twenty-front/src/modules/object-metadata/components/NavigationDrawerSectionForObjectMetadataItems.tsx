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

type Section = 'CRM' | 'Scheduling' | 'Billing' | 'Custom';

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
    useNavigationSection(
      'Objects' + sectionTitle + (isRemote ? 'Remote' : 'Workspace'),
    );
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  const { getIcon } = useIcons();
  const currentPath = useLocation().pathname;

  const { getLastVisitedViewIdFromObjectMetadataItemId } = useLastVisitedView();

  // Define the sections and their corresponding items
  const sectionItems: Record<Section, string[]> = {
    CRM: ['Companies', 'People', 'Opportunities', 'Tasks', 'Notes'],
    Scheduling: ['Crews', 'Jobs'],
    Billing: ['Work Orders', 'Materials', 'Services'],
    Custom: [],
  };

  // Group items into sections
  const categorizedItems = (Object.keys(sectionItems) as Section[]).reduce(
    (acc, section) => {
      if (section !== 'Custom') {
        acc[section] = objectMetadataItems.filter((item) =>
          sectionItems[section].includes(item.labelPlural),
        );
      }
      return acc;
    },
    {} as Record<Section, ObjectMetadataItem[]>,
  );

  // Any items not included in predefined sections are 'Custom'
  categorizedItems['Custom'] = objectMetadataItems.filter(
    (item) => !Object.values(sectionItems).flat().includes(item.labelPlural),
  );

  // Function to render each section
  const renderSection = (section: Section) => {
    const items = categorizedItems[section];
    if (items.length === 0) return null;

    return (
      <div key={section}>
        <NavigationDrawerSectionTitle label={section} />
        {items
          .sort((a, b) => {
            // For defined sections, sort according to sectionItems order
            if (section in sectionItems && section !== 'Custom') {
              const indexA = sectionItems[section]?.indexOf(a.labelPlural) ?? 0;
              const indexB = sectionItems[section]?.indexOf(b.labelPlural) ?? 0;
              return indexA - indexB;
            }
            // For 'Custom', sort alphabetically
            return a.labelPlural.localeCompare(b.labelPlural);
          })
          .map((objectMetadataItem) => {
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
      </div>
    );
  };

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle
          label={sectionTitle}
          onClick={() => toggleNavigationSection()}
        />
        {isNavigationSectionOpen &&
          (Object.keys(categorizedItems) as Section[]).map((section) =>
            renderSection(section),
          )}
      </NavigationDrawerSection>
    )
  );
};
