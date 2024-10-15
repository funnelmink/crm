'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IconChevronDown, IconNumber20Small } from '@tabler/icons-react';

import { CallToAction } from '@/app/_components/ui/layout/header/callToAction';
import {
  DesktopNav,
  LinkList,
  ListItem,
  LogoContainer,
} from '@/app/_components/ui/layout/header/styled';
import { LogoBw, WideLogo } from '@/app/_components/ui/layout/Logo';
import { Theme } from '@/app/_components/ui/theme/theme';

const DropdownMenu = styled.ul<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 2px 0;
  margin: 4px 0px;
  width: 150px;
`;

const DropdownItem = styled.a`
  color: rgb(71, 71, 71);
  text-decoration: none;
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  margin: 0px 2px;
  border-radius: 4px;
  font-size: 15px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Dropdown = styled.div`
  color: rgb(71, 71, 71);
  text-decoration: none;
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 8px;
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledIconContainer = styled.div`
  border: 1px solid ${Theme.text.color.secondary};
  border-radius: ${Theme.border.radius.sm};
  display: flex;
  align-items: center;
  padding: 2px;
`;

const StyledChevron = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  color: rgb(179, 179, 179);
`;

const Arrow = styled.div<{ open: boolean }>`
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s;
  transform: ${(props) => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const HeaderDesktop = () => {
  const [releaseDropdownOpen, setReleaseDropdownOpen] = useState(false);
  const releaseDropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleReleaseDropdown = () => {
    if (mounted) {
      setReleaseDropdownOpen((prev) => !prev);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      releaseDropdownRef.current &&
      !releaseDropdownRef.current.contains(event.target as Node)
    ) {
      setReleaseDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DesktopNav>
      <LogoContainer>
        <WideLogo />
      </LogoContainer>
      <LinkList>
        <ListItem href="/pricing">Pricing</ListItem>
        <ListItem
          href="https://twenty.com/user-guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          User Guide
        </ListItem>
        <Dropdown
          ref={releaseDropdownRef}
          style={{ position: 'relative' }}
          onClick={toggleReleaseDropdown}
        >
          Releases
          <Arrow open={releaseDropdownOpen}>
            <StyledChevron>
              <IconChevronDown size={Theme.icon.size.sm} />
            </StyledChevron>
          </Arrow>
          {mounted && (
            <DropdownMenu open={releaseDropdownOpen}>
              <DropdownItem href="/fm-releases">
                <StyledIconContainer>
                  <LogoBw size={Theme.icon.size.md} />
                </StyledIconContainer>
                Funnelmink
              </DropdownItem>
              <DropdownItem href="/releases">
                <StyledIconContainer>
                  <IconNumber20Small size={Theme.icon.size.md} />
                </StyledIconContainer>
                Twenty
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </LinkList>
      <CallToAction />
    </DesktopNav>
  );
};
