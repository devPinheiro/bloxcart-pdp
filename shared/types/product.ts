import type { AppLocale } from '@/i18n/routing';

export type ProductAvailability = 'InStock' | 'OutOfStock';

/** Per-locale PDP copy and pricing from the take-home brief. */
export interface ProductLocaleContent {
  title: string;
  description: string;
  priceOriginal: string;
  priceCurrent: string;
  priceSavings: string;
  ctaLabel: string;
  trustBadges: string[];
  priceAmount: number;
  priceOriginalAmount: number;
  priceCurrency: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  /** Intrinsic pixel width — passed to next/image to reserve layout space (CLS). */
  width: number;
  /** Intrinsic pixel height — passed to next/image to reserve layout space (CLS). */
  height: number;
}

export interface ProductGame {
  slug: string;
  name: string;
}

export interface ProductStock {
  available: boolean;
  quantity: number;
}

/** Single-source mock catalog record (brief JSON shape + locale URL slugs). */
export interface ProductRecord {
  slug: string;
  slugs: Record<AppLocale, string>;
  game: ProductGame;
  category: string;
  rarity: string;
  delivery: string;
  condition: string;
  tags: string[];
  locales: Record<AppLocale, ProductLocaleContent>;
  stock: ProductStock;
  images: ProductImage[];
}

export interface ProductPageParams {
  locale: AppLocale;
  slug: string;
}
