'use client';

import React, { useState } from 'react';
import { IBM_Plex_Mono } from 'next/font/google';

import { GithubIcon } from '@/app/_components/ui/icons/SvgIcons';
import { CallToAction } from '@/app/_components/ui/layout/header/callToAction';
import {
  HamburgerContainer,
  HamburgerLine1,
  HamburgerLine2,
  ListItem,
  LogoAddon,
  LogoContainer,
  MobileLinkList,
  MobileMenu,
  MobileNav,
  NavOpen,
} from '@/app/_components/ui/layout/header/styled';
import { Logo } from '@/app/_components/ui/layout/Logo';

const IBMPlexMono = IBM_Plex_Mono({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

export const HeaderMobile = () => {
  const isTwentyDev = false;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <MobileMenu>
      <MobileNav>
        <LogoContainer>
          <Logo />
          {isTwentyDev && (
            <LogoAddon className={IBMPlexMono.className}>
              for Developers
            </LogoAddon>
          )}
        </LogoContainer>
        <HamburgerContainer>
          <input type="checkbox" id="menu-input" onChange={toggleMenu} />
          <HamburgerLine1 id="line1" />
          <HamburgerLine2 id="line2" />
        </HamburgerContainer>
      </MobileNav>
      <NavOpen
        style={{
          transform: `scaleY(${menuOpen ? '1' : '0'})`,
        }}
      >
        <MobileLinkList>
          <ListItem href="/pricing">Pricing</ListItem>
          <ListItem href="/fm-releases">Releases</ListItem>
          <ListItem
            href="https://twenty.com/user-guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            User Guide
          </ListItem>
          <ListItem
            href="https://github.com/funnelmink/crm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon color="rgb(71,71,71)" />{' '}
          </ListItem>
        </MobileLinkList>
        <CallToAction />
      </NavOpen>
    </MobileMenu>
  );
};
