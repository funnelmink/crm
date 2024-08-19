import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DocsMain from '@/app/_components/docs/DocsMain';
import { getDocsArticles } from '@/content/user-guide/constants/getDocsArticles';
import { fetchArticleFromSlug } from '@/shared-utils/fetchArticleFromSlug';
import { formatSlug } from '@/shared-utils/formatSlug';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { folder: string };
}): Promise<Metadata> {
  const formattedSlug = formatSlug(params.folder);
  const basePath = '/src/content/twenty-ui';
  const mainPost = await fetchArticleFromSlug(params.folder, basePath);
  return {
    title: 'Funnelmink - ' + formattedSlug,
    description: mainPost?.itemInfo?.info,
  };
}

export default async function TwentyUISlug({
  params,
}: {
  params: { folder: string };
}) {
  const filePath = `src/content/twenty-ui/${params.folder}/`;
  const docsArticleCards = getDocsArticles(filePath);
  const isSection = true;
  const hasOnlyEmptySections = docsArticleCards.every(
    (article) => article.topic === 'Empty Section',
  );
  if (!docsArticleCards || hasOnlyEmptySections) {
    notFound();
  }
  return <DocsMain docsArticleCards={docsArticleCards} isSection={isSection} />;
}
