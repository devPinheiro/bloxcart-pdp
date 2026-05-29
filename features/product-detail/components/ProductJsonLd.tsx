import type { AppLocale } from '@/i18n/routing';
import type { ProductRecord } from '@/shared/types/product';
import { buildProductJsonLd } from '../lib/product-json-ld';

export interface ProductJsonLdProps {
  locale: AppLocale;
  product: ProductRecord;
}

/** Injects schema.org Product JSON-LD for crawlers. */
export function ProductJsonLd({ locale, product }: ProductJsonLdProps) {
  const jsonLd = buildProductJsonLd(locale, product);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
