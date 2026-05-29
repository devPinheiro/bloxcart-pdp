import type { MetadataRoute } from 'next';
import { getAllProductPaths } from '@/features/product-detail/lib/get-product';

/** All indexable URLs for sitemap.xml (home + localized PDP routes). */
export function buildAppSitemap(baseUrl: string): MetadataRoute.Sitemap {
  const now = new Date();
  const base = baseUrl.replace(/\/$/, '');

  const homeEntries = (['en-US', 'es-ES'] as const).map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productEntries = getAllProductPaths().map(({ locale, game, slug }) => ({
    url: `${base}/${locale}/games/${game}/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  return [...homeEntries, ...productEntries];
}
