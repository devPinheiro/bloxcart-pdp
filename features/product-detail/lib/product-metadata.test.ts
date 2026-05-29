import { afterEach, describe, expect, it, vi } from 'vitest';
import { T_REX_PRODUCT } from '../data/t-rex-product';
import { buildProductMetadata } from './product-metadata';

describe('buildProductMetadata', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sets locale-specific title and description', () => {
    const en = buildProductMetadata('en-US', T_REX_PRODUCT);
    const es = buildProductMetadata('es-ES', T_REX_PRODUCT);

    expect(en.title).toBe('Permanent T-Rex Fruit Roblox');
    expect(en.description).toContain('Permanent T-Rex Fruit');
    expect(es.title).toBe('Fruta T-Rex Permanente Roblox');
    expect(es.description).toContain('Fruta T-Rex Permanente');
  });

  it('sets canonical and reciprocal hreflang alternates with locale-specific slugs', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://bloxcart.example');

    const en = buildProductMetadata('en-US', T_REX_PRODUCT);
    const es = buildProductMetadata('es-ES', T_REX_PRODUCT);

    expect(en.alternates?.canonical).toBe(
      'https://bloxcart.example/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
    );
    expect(en.alternates?.languages).toEqual({
      'en-US': 'https://bloxcart.example/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
      'es-ES': 'https://bloxcart.example/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
      'x-default': 'https://bloxcart.example/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
    });

    expect(es.alternates?.canonical).toBe(
      'https://bloxcart.example/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
    );
    expect(es.alternates?.languages?.['en-US']).toBe(en.alternates?.canonical);
    expect(es.alternates?.languages?.['es-ES']).toBe(es.alternates?.canonical);
  });

  it('includes Open Graph and Twitter tags with absolute image URLs', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://bloxcart.example');

    const metadata = buildProductMetadata('en-US', T_REX_PRODUCT);

    expect(metadata.openGraph?.title).toBe('Permanent T-Rex Fruit Roblox');
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect(metadata.openGraph?.alternateLocale).toEqual(['es_ES']);
    const heroUrl = T_REX_PRODUCT.images[0]?.url;
    expect(metadata.openGraph?.images?.[0]?.url).toBe(heroUrl);
    expect(metadata.openGraph?.images?.[0]?.url).toMatch(/^https:\/\//);

    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBe('Permanent T-Rex Fruit Roblox');
    expect(metadata.twitter?.images?.[0]).toBe(heroUrl);
  });
});
