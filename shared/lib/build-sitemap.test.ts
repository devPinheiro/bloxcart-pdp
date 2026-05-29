import { describe, expect, it } from 'vitest';
import { buildAppSitemap } from './build-sitemap';

describe('buildAppSitemap', () => {
  it('includes localized home pages and both PDP routes', () => {
    const entries = buildAppSitemap('https://bloxcart.example');

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'https://bloxcart.example/en-US',
          changeFrequency: 'weekly',
        }),
        expect.objectContaining({
          url: 'https://bloxcart.example/es-ES',
          changeFrequency: 'weekly',
        }),
        expect.objectContaining({
          url: 'https://bloxcart.example/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
          changeFrequency: 'daily',
          priority: 1,
        }),
        expect.objectContaining({
          url: 'https://bloxcart.example/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
          changeFrequency: 'daily',
          priority: 1,
        }),
      ]),
    );
  });

  it('strips trailing slash from base URL', () => {
    const entries = buildAppSitemap('https://bloxcart.example/');
    expect(entries.some((entry) => entry.url.includes('example//'))).toBe(false);
  });
});
