'use client';

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

interface IFrameContainerProps {
  src: string;
}

export const IFrameContainer: React.FC<IFrameContainerProps> = ({ src }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SET_IFRAME_HEIGHT' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Container>
      <iframe
        ref={iframeRef}
        src={src}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          overflow: 'hidden',
        }}
        scrolling="no"
      />
    </Container>
  );
};
