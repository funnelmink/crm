import React from 'react';
import { Metadata } from 'next';

import { ReleaseContainer } from '@/app/_components/releases/ReleaseContainer';
import { Title } from '@/app/_components/releases/StyledTitle';
import { ContentContainer } from '@/app/_components/ui/layout/ContentContainer';
import {
  getMdxReleasesContent,
  getReleases,
} from '@/app/releases/utils/get-releases';

export const metadata: Metadata = {
  title: 'Twenty Releases',
  description: 'Discover the newest features and improvements in Twenty.',
};

const Home = async () => {
  const releaseNotes = await getReleases();

  const mdxReleasesContent = await getMdxReleasesContent(releaseNotes);

  return (
    <ContentContainer>
      <Title />
      <ReleaseContainer
        visibleReleasesNotes={releaseNotes}
        mdxReleasesContent={mdxReleasesContent}
      />
    </ContentContainer>
  );
};

export default Home;
