import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/routing';
import type { ProductRecord } from '@/shared/types/product';
import { getSiteUrl } from '@/shared/lib/site-url';
import { productAlternateUrls, productCanonicalUrl } from './product-urls';

function absoluteAssetUrl(path: string): string {
  return path.startsWith('http') ? path : `${getSiteUrl()}${path}`;
}

/** Locale-aware PDP metadata for generateMetadata (title, OG, canonical, hreflang). */
export function buildProductMetadata(
  locale: AppLocale,
  product: ProductRecord,
): Metadata {
  const content = product.locales[locale];
  const alternates = productAlternateUrls(product);
  const canonical = productCanonicalUrl(locale, product);
  const ogImage = product.images[0]?.url;
  const ogImageUrl = ogImage ? absoluteAssetUrl(ogImage) : undefined;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: {
        'en-US': alternates['en-US'],
        'es-ES': alternates['es-ES'],
        'x-default': alternates['en-US'],
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: 'BloxCart',
      locale: locale.replace('-', '_'),
      alternateLocale: locale === 'en-US' ? ['es_ES'] : ['en_US'],
      type: 'website',
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 800, height: 800, alt: content.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}
