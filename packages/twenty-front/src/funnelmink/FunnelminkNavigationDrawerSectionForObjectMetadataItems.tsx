import { NavigationDrawerItemForObjectMetadataItem } from '@/object-metadata/components/NavigationDrawerItemForObjectMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

type Section = 'CRM' | 'Scheduling' | 'Billing' | 'Custom';

const sectionItems: Record<Section, string[]> = {
  CRM: ['Companies', 'People', 'Opportunities', 'Tasks', 'Notes'],
  Scheduling: ['Crews', 'Jobs'],
  Billing: ['Work Orders', 'Materials', 'Services'],
  Custom: [],
};

const StyledObjectsMetaDataItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.betweenSiblingsGap};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  flex: 1;
  overflow-y: auto;
`;

export const FunnelminkNavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  isRemote,
  objectMetadataItems,
}: {
  sectionTitle: string;
  isRemote: boolean;
  objectMetadataItems: ObjectMetadataItem[];
}) => {
  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection('Objects' + (isRemote ? 'Remote' : 'Workspace'));
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

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

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerAnimatedCollapseWrapper>
          <NavigationDrawerSectionTitle
            label={sectionTitle}
            onClick={() => toggleNavigationSection()}
          />
        </NavigationDrawerAnimatedCollapseWrapper>
        <ScrollWrapper contextProviderName="navigationDrawer">
          <StyledObjectsMetaDataItemsWrapper>
            {isNavigationSectionOpen &&
              (Object.keys(categorizedItems) as Section[]).map((section) => {
                const items = categorizedItems[section];
                if (items.length === 0) return null;
                return (
                  <div key={section}>
                    <NavigationDrawerSectionTitle label={section} />
                    {items
                      .sort((a, b) => {
                        // For defined sections, sort according to sectionItems order
                        if (section in sectionItems && section !== 'Custom') {
                          const indexA =
                            sectionItems[section]?.indexOf(a.labelPlural) ?? 0;
                          const indexB =
                            sectionItems[section]?.indexOf(b.labelPlural) ?? 0;
                          return indexA - indexB;
                        }
                        // For 'Custom', sort alphabetically
                        return a.labelPlural.localeCompare(b.labelPlural);
                      })
                      .map((objectMetadataItem) => (
                        <NavigationDrawerItemForObjectMetadataItem
                          key={`navigation-drawer-item-${objectMetadataItem.id}`}
                          objectMetadataItem={objectMetadataItem}
                        />
                      ))}
                  </div>
                );
              })}
          </StyledObjectsMetaDataItemsWrapper>
        </ScrollWrapper>
      </NavigationDrawerSection>
    )
  );
};
