import { Button } from '@/ui/input/button/components/Button';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconChevronDown } from 'twenty-ui';

type SettingsDataModelNewFieldBreadcrumbDropDownProps = {
  isConfigureStep: boolean;
  onBreadcrumbClick: (isConfigureStep: boolean) => void;
};

const StyledContainer = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.font.color.secondary};
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.md};
`;
const StyledButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledDownChevron = styled(IconChevronDown)`
  color: ${({ theme }) => theme.font.color.primary};
  position: absolute;
  right: ${({ theme }) => theme.spacing(1.5)};
  top: 50%;
  transform: translateY(-50%);
`;

const StyledMenuItem = styled(MenuItem)<{ selected?: boolean }>`
  background: ${({ theme, selected }) =>
    selected ? theme.background.quaternary : 'transparent'};
  cursor: pointer;
`;

const StyledSpan = styled.span`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.font.color.primary};
  padding-right: ${({ theme }) => theme.spacing(6)};
`;

export const SettingsDataModelNewFieldBreadcrumbDropDown = ({
  isConfigureStep,
  onBreadcrumbClick,
}: SettingsDataModelNewFieldBreadcrumbDropDownProps) => {
  const dropdownId = `settings-object-new-field-breadcrumb-dropdown`;

  const { closeDropdown } = useDropdown(dropdownId);

  const handleClick = (step: boolean) => {
    onBreadcrumbClick(step);
    closeDropdown();
  };
  const theme = useTheme();

  return (
    <StyledContainer>
      New Field <StyledSpan>-</StyledSpan>
      <Dropdown
        dropdownPlacement="bottom-start"
        dropdownId={dropdownId}
        clickableComponent={
          <StyledButtonContainer>
            <StyledDownChevron size={theme.icon.size.md} />
            {isConfigureStep ? (
              <StyledButton variant="tertiary" title="2. Configure" />
            ) : (
              <StyledButton variant="tertiary" title="1. Type" />
            )}
          </StyledButtonContainer>
        }
        dropdownComponents={
          <DropdownMenu>
            <DropdownMenuItemsContainer>
              <StyledMenuItem
                text="1. Type"
                onClick={() => handleClick(false)}
                selected={!isConfigureStep}
              />
              <StyledMenuItem
                text="2. Configure"
                onClick={() => handleClick(true)}
                selected={isConfigureStep}
              />
            </DropdownMenuItemsContainer>
          </DropdownMenu>
        }
        dropdownHotkeyScope={{
          scope: dropdownId,
        }}
      />
    </StyledContainer>
  );
};
