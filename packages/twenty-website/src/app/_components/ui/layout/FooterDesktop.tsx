'use client';

import styled from '@emotion/styled';

import { DiscordIcon, GithubIcon2 } from '../icons/SvgIcons';

import { Logo } from './Logo';

const FooterContainer = styled.div`
  padding: 64px 96px 64px 96px;
  display: flex;
  flex-direction: column;
  color: rgb(129, 129, 129);
  gap: 32px;
  @media (max-width: 809px) {
    padding: 36px 24px;
  }
`;

const LeftSideFooter = styled.div`
  width: 36Opx;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 809px) {
    display: none;
  }
`;

const RightSideFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  height: 146px;
  @media (max-width: 809px) {
    flex-direction: column;
    height: fit-content;
  }
`;

const RightSideFooterColumn = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RightSideFooterLink = styled.a`
  color: rgb(129, 129, 129);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

const RightSideFooterColumnTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;

export const FooterDesktop = () => {
  return (
    <FooterContainer>
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <LeftSideFooter>
          <Logo />
          <div>Landscaping CRM</div>
        </LeftSideFooter>
        <RightSideFooter>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Company</RightSideFooterColumnTitle>
            <RightSideFooterLink href="/pricing">Pricing</RightSideFooterLink>
          </RightSideFooterColumn>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Resources</RightSideFooterColumnTitle>
            <RightSideFooterLink href="/fm-releases">
              Changelog
            </RightSideFooterLink>
            <RightSideFooterLink
              href="https://twenty.com/user-guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              User Guide
            </RightSideFooterLink>
          </RightSideFooterColumn>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Legal</RightSideFooterColumnTitle>
            <RightSideFooterLink href="/legal/terms">
              Terms of Service
            </RightSideFooterLink>
            <RightSideFooterLink href="/legal/privacy">
              Privacy Policy
            </RightSideFooterLink>
          </RightSideFooterColumn>
        </RightSideFooter>
      </div>
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTop: '1px solid rgb(179, 179, 179)',
          paddingTop: '32px',
        }}
      >
        <div>
          <span style={{ fontFamily: 'Inter, sans-serif' }}>©</span>
          {new Date().getFullYear()} FunnelMink LLC
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <a
            href="https://github.com/funnelmink/crm"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon2 size="M" />
          </a>
          <a
            href="https://discord.gg/rDcRJBrWUf"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon size="M" />
          </a>
        </div>
      </div>
    </FooterContainer>
  );
};
