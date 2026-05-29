import type { AppLocale } from '@/i18n/routing';
import type { ProductRecord } from '@/shared/types/product';
import { getSiteUrl } from '@/shared/lib/site-url';

export function productPath(locale: AppLocale, product: ProductRecord): string {
  return `/${locale}/games/${product.game.slug}/${product.slugs[locale]}`;
}

export function productCanonicalUrl(locale: AppLocale, product: ProductRecord): string {
  return `${getSiteUrl()}${productPath(locale, product)}`;
}

export function productAlternateUrls(product: ProductRecord): Record<AppLocale, string> {
  return {
    'en-US': `${getSiteUrl()}${productPath('en-US', product)}`,
    'es-ES': `${getSiteUrl()}${productPath('es-ES', product)}`,
  };
}
