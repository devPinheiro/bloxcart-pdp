import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = {
  'en-US': {
    path: '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
    price: '$21.50',
    backLink: 'Back to Shop',
    hreflang: 'es-ES',
    alternatePath: '/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
  },
  'es-ES': {
    path: '/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox',
    price: '21,50 €',
    backLink: 'Volver a la tienda',
    hreflang: 'en-US',
    alternatePath: '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox',
  },
} as const;

for (const [locale, config] of Object.entries(routes)) {
  test(`PDP content and SEO (${locale})`, async ({ page }) => {
    await page.goto(config.path);

    await expect(page.getByRole('link', { name: config.backLink })).toBeVisible();
    await expect(page.getByTestId('price-current')).toContainText(config.price);
    await expect(page.getByTestId('meta-table')).toBeVisible();
    await expect(page.getByTestId('trust-cards')).toBeVisible();

    const alternate = page.locator(`link[rel="alternate"][hreflang="${config.hreflang}"]`);
    await expect(alternate).toHaveCount(1);
    await expect(alternate).toHaveAttribute('href', new RegExp(`${config.alternatePath}$`));

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const schema = JSON.parse((await jsonLd.textContent()) ?? '{}');
    expect(schema['@type']).toBe('Product');
    expect(schema.offers.price).toBe('21.50');
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
    expect(schema.aggregateRating.ratingValue).toBe(4.8);

    await page.getByTestId('gallery-thumb-2').click();
    await expect(page.getByTestId('gallery-hero')).toHaveAttribute(
      'alt',
      'T-Rex Fruit angle 3',
    );

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test(`PDP mobile layout (${locale})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(config.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('price-block')).toBeVisible();
  });
}
