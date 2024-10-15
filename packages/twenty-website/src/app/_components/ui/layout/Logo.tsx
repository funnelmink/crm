import styled from '@emotion/styled';

const Link = styled.a`
  display: block;
  image-rendering: pixelated;
  flex-shrink: 0;
  background-size: 100% 100%;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  background-image: url('/images/core/logo.svg');
  opacity: 1;
`;

const WideLink = styled.a`
  display: block;
  image-rendering: pixelated;
  flex-shrink: 0;
  background-size: 100% 100%;
  border-radius: 8px;
  height: 25px;
  width: 170px;
  background-image: url('/images/core/logo-corner.png');
  opacity: 1;
`;

export const WideLogo = () => {
  return <WideLink href="/" />;
};

export const Logo = () => {
  return <Link href="/" />;
};

export const LogoBw = styled.img<{ size: number }>`
  display: block;
  image-rendering: pixelated;
  flex-shrink: 0;
  background-size: 100% 100%;
  border-radius: 8px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-image: url('/images/core/logo-bw.svg');
  opacity: 1;
`;

const LogoImageStyle = styled.a<{ size: number }>`
  display: block;
  image-rendering: pixelated;
  flex-shrink: 0;
  background-size: 100% 100%;
  border-radius: 8px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-image: url('/images/core/logo.svg');
  opacity: 1;
`;

export const LogoImage = ({ size = 40 }) => {
  return <LogoImageStyle size={size} />;
};
