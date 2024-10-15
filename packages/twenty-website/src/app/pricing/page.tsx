'use client';

import React from 'react';
import styled from '@emotion/styled';
import PricingCard from '@/app/_components/funnelmink/PricingCard';

const PricingWrapper = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-top: 20px;
  padding: 40px;
  align-items: stretch;
`;

const Pricing: React.FC = () => {
  const commonFeatures = [
    'Full access',
    'Unlimited contacts',
    'Email integration',
    'Custom objects',
    'API & Webhooks',
    'Frequent updates',
    'And much more!',
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Pricing</h1>
      <span>Choose the plan that fits your needs.</span>
      <PricingWrapper>
        {/* Annual Plan */}
        <PricingCard
          title="Annual"
          price="$8.33"
          billingCycle="/user/month"
          trialText="14 days free"
          features={commonFeatures}
          infoTag="Most popular"
          infoTagColor="#ff6347"
          buttonText="Start trial"
          buttonLink="https://app.funnelmink.com"
          bgColor="#f1f1f1"
        />

        {/* Monthly Plan */}
        <PricingCard
          title="Monthly"
          price="$9.99"
          billingCycle="/user/month"
          trialText="14 days free"
          features={commonFeatures}
          infoTag="Cancel any time"
          infoTagColor="#333"
          buttonText="Start trial"
          buttonLink="https://app.funnelmink.com"
        />
      </PricingWrapper>
    </div>
  );
};

export default Pricing;
