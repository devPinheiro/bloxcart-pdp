import type { AppLocale } from '@/i18n/routing';
import type { ProductGame } from '@/shared/types/product';
import { getCatalogProductsForGame } from '@/features/product-detail/lib/get-product';
import { productPath } from '@/features/product-detail/lib/product-urls';

export type CatalogGameLink = {
  game: ProductGame;
  href: string;
};

/** Resolve shop links for each catalog game (first product per game). */
export function getCatalogGameLinks(locale: AppLocale): CatalogGameLink[] {
  return getCatalogProductsForGame().map(({ game, product }) => ({
    game,
    href: productPath(locale, product),
  }));
}
