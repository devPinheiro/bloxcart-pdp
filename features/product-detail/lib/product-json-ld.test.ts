import { describe, expect, it, vi, afterEach } from 'vitest';
import { T_REX_PRODUCT } from '../data/t-rex-product';
import { buildProductJsonLd } from './product-json-ld';

describe('buildProductJsonLd', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('includes locale offer price and currency', () => {
    const en = buildProductJsonLd('en-US', T_REX_PRODUCT);
    expect(en.offers.price).toBe('21.50');
    expect(en.offers.priceCurrency).toBe('USD');

    const es = buildProductJsonLd('es-ES', T_REX_PRODUCT);
    expect(es.offers.price).toBe('21.50');
    expect(es.offers.priceCurrency).toBe('EUR');
  });

  it('maps availability to schema.org URLs', () => {
    const inStock = buildProductJsonLd('en-US', T_REX_PRODUCT);
    expect(inStock.offers.availability).toBe('https://schema.org/InStock');

    vi.stubEnv('SHOW_OOS', 'true');
    const outOfStock = buildProductJsonLd('en-US', T_REX_PRODUCT);
    expect(outOfStock.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  it('includes placeholder aggregate rating for rich-result demo', () => {
    const schema = buildProductJsonLd('en-US', T_REX_PRODUCT);

    expect(schema.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 1284,
    });
  });
});
