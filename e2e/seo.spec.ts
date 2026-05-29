import { test, expect } from '@playwright/test';

const PDP_ROUTES = {
  'en-US': {
    path: '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
    title: 'Permanent T-Rex Fruit Roblox',
    descriptionSnippet: 'Permanent T-Rex Fruit is a Beast-type',
    canonicalPath: '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
    alternateLocale: 'es-ES',
    alternatePath: '/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
  },
  'es-ES': {
    path: '/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
    title: 'Fruta T-Rex Permanente Roblox',
    descriptionSnippet: 'Fruta T-Rex Permanente es una habilidad',
    canonicalPath: '/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
    alternateLocale: 'en-US',
    alternatePath: '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
  },
} as const;

for (const [locale, config] of Object.entries(PDP_ROUTES)) {
  test(`PDP metadata and hreflang reciprocals (${locale})`, async ({ page }) => {
    await page.goto(config.path);

    await expect(page).toHaveTitle(config.title);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', new RegExp(config.descriptionSnippet));

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', new RegExp(`${config.canonicalPath}$`));

    const alternate = page.locator(
      `link[rel="alternate"][hreflang="${config.alternateLocale}"]`,
    );
    await expect(alternate).toHaveCount(1);
    await expect(alternate).toHaveAttribute('href', new RegExp(`${config.alternatePath}$`));

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      config.title,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      new RegExp(`${config.canonicalPath}$`),
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      new RegExp(config.descriptionSnippet),
    );
  });
}

test('sitemap.xml lists localized PDP URLs', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();

  const body = await response.text();
  expect(body).toContain('/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox');
  expect(body).toContain('/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox');
  expect(body).toContain('/en-US');
  expect(body).toContain('/es-ES');
});

test('robots.txt references sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBeTruthy();

  const body = await response.text();
  expect(body.toLowerCase()).toContain('sitemap:');
  expect(body).toContain('/sitemap.xml');
});
