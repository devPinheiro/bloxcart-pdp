import type { AppLocale } from '@/i18n/routing';
import type { ProductRecord } from '@/shared/types/product';
import { productCanonicalUrl } from './product-urls';
import { resolveAvailability } from './get-product';

/** Placeholder rating for SEO demo (not in brief mock JSON). */
const PLACEHOLDER_RATING = { ratingValue: 4.8, reviewCount: 1284 };

export function buildProductJsonLd(locale: AppLocale, product: ProductRecord) {
  const content = product.locales[locale];
  const availability = resolveAvailability(product);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: content.title,
    description: content.description,
    image: product.images.map((image) => image.url),
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      url: productCanonicalUrl(locale, product),
      priceCurrency: content.priceCurrency,
      price: content.priceAmount.toFixed(2),
      availability:
        availability === 'InStock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PLACEHOLDER_RATING.ratingValue,
      reviewCount: PLACEHOLDER_RATING.reviewCount,
    },
  };
}
