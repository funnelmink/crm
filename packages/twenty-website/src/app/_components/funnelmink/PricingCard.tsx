'use client';

import React from 'react';
import styled from '@emotion/styled';
import { LogoImage } from '@/app/_components/ui/layout/Logo';

const CardContainer = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || 'white'};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
  min-width: 260px;
`;

const InfoTag = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || '#ff6347'};
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const FeaturesList = styled.div`
  text-align: left;
  margin-top: 16px;
  color: black;
  font-size: 15px;
`;

const Checkmark = styled.span`
  color: green;
  margin-right: 8px;
  font-size: 14px;
`;

const Button = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 20px;
`;

interface PricingCardProps {
  title: string;
  price: string;
  billingCycle: string;
  trialText: string;
  features: string[];
  infoTag?: string;
  infoTagColor?: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  billingCycle,
  trialText,
  features,
  infoTag,
  infoTagColor,
  buttonText,
  buttonLink,
  bgColor,
}) => {
  return (
    <CardContainer bgColor={bgColor}>
      {infoTag && <InfoTag bgColor={infoTagColor}>{infoTag}</InfoTag>}
      <LogoImage size={100} />
      <p style={{ fontWeight: 600, color: 'black', fontSize: '28px' }}>
        {title}
      </p>
      <p style={{ fontWeight: 500, color: 'slategray', fontSize: '14px' }}>
        {trialText}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <p style={{ fontWeight: 600, color: 'black', fontSize: '28px' }}>
          {price}
        </p>
        <span>{billingCycle}</span>
      </div>
      <Button href={buttonLink}>{buttonText}</Button>
      <FeaturesList>
        <p>This includes:</p>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              <Checkmark>✓</Checkmark>
              {feature}
            </li>
          ))}
        </ul>
      </FeaturesList>
    </CardContainer>
  );
};

export default PricingCard;
