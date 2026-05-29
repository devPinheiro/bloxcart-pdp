import type { AppLocale } from '@/i18n/routing';
import type { ProductAvailability, ProductRecord } from '@/shared/types/product';
import { T_REX_PRODUCT } from '../data/t-rex-product';

const CATALOG: ProductRecord[] = [T_REX_PRODUCT];

/**
 * Resolve a product by game and locale-specific slug.
 * @param locale Active locale segment
 * @param game Game slug from the URL
 * @param slug Product slug for the active locale
 */
export function getProductBySlug(
  locale: AppLocale,
  game: string,
  slug: string,
): ProductRecord | null {
  return (
    CATALOG.find((p) => p.game.slug === game && p.slugs[locale] === slug) ?? null
  );
}

/** Unique games represented in the mock catalog. */
export function getCatalogGames(): ProductRecord['game'][] {
  const games = new Map<string, ProductRecord['game']>();
  for (const product of CATALOG) {
    games.set(product.game.slug, product.game);
  }
  return [...games.values()];
}

/** One representative product per game for shop / selector links. */
export function getCatalogProductsForGame(): Array<{
  game: ProductRecord['game'];
  product: ProductRecord;
}> {
  const byGame = new Map<string, ProductRecord>();
  for (const product of CATALOG) {
    if (!byGame.has(product.game.slug)) {
      byGame.set(product.game.slug, product);
    }
  }
  return [...byGame.values()].map((product) => ({
    game: product.game,
    product,
  }));
}

/** All localized PDP paths for sitemap and static generation. */
export function getAllProductPaths(): Array<{
  locale: AppLocale;
  game: string;
  slug: string;
}> {
  return CATALOG.flatMap((product) =>
    (['en-US', 'es-ES'] as const).map((locale) => ({
      locale,
      game: product.game.slug,
      slug: product.slugs[locale],
    })),
  );
}

/**
 * Whether the product should render as out of stock (brief stock + SHOW_OOS demo flag).
 */
export function resolveAvailability(product: ProductRecord): ProductAvailability {
  if (process.env.SHOW_OOS === 'true' || !product.stock.available) {
    return 'OutOfStock';
  }
  return 'InStock';
}

/** Stock quantity shown on PDP (0 when unavailable). */
export function resolveStockQuantity(product: ProductRecord): number {
  if (resolveAvailability(product) === 'OutOfStock') {
    return 0;
  }
  return product.stock.quantity;
}
