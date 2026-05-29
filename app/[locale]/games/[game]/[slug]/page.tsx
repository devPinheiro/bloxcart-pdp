import {
  getAllProductPaths,
  getProductBySlug,
  resolveAvailability,
} from '@/features/product-detail/lib/get-product';

import type { AppLocale } from '@/i18n/routing';
import { BackToShop } from '@/shared/components/BackToShop';
import { ProductDetailView } from '@/features/product-detail/components/ProductDetailView';
import { buildProductMetadata } from '@/features/product-detail/lib/product-metadata';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

/** ISR (Incremental Static Regeneration) with a 60s TTL:
 * - vs fully static: price/stock would stay stale until the next deploy; unacceptable for commerce.
 * - vs SSR (dynamic on every request): always fresh but slower TTFB and higher origin load on spikes.
 * - ISR: `generateStaticParams` pre-renders known locale paths at build; CDN serves cached HTML
 *   instantly and Next regenerates in the background after 60s when data changes (catalog, SHOW_OOS).
 * Tradeoff: updates can lag up to one minute — fine for PDP reads, wrong for checkout/inventory locks.
 */
export const revalidate = 60;

export function generateStaticParams() {
  return getAllProductPaths();
}

type PageProps = {
  params: Promise<{ locale: string; game: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale, game, slug } = await params;
  const loc = locale as AppLocale;
  const product = getProductBySlug(loc, game, slug);
  if (!product) return {};

  return buildProductMetadata(loc, product);
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, game, slug } = await params;
  const loc = locale as AppLocale;
  if (!['en-US', 'es-ES'].includes(loc)) notFound();

  setRequestLocale(loc);
  const product = getProductBySlug(loc, game, slug);
  if (!product) notFound();

  const availability = resolveAvailability(product);
  const lcpImage = product.images[0]?.url;

  return (
    <>
    {/* Preload the LCP image */}
      {lcpImage ? (
        <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
      ) : null}
      <BackToShop
        locale={loc}
        gameSlug={product.game.slug}
        gameName={product.game.name}
      />
      <ProductDetailView
        locale={loc}
        product={product}
        availability={availability}
      />
    </>
  );
}
