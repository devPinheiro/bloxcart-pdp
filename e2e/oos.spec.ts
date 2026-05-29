import { test, expect } from '@playwright/test';

const PDP_PATH = '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox';

test.describe('out of stock (SHOW_OOS=true)', () => {
  test.skip(
    process.env.SHOW_OOS !== 'true',
    'Set SHOW_OOS=true when starting the server (e.g. pnpm test:e2e:oos)',
  );

  test('disables purchase controls and updates JSON-LD availability', async ({
    page,
  }) => {
    await page.goto(PDP_PATH);

    const cta = page.getByRole('button', { name: 'Out of stock' });
    await expect(cta).toBeVisible();
    await expect(cta).toBeDisabled();

    await expect(page.getByLabel('Increase quantity')).toBeDisabled();

    const jsonLd = page.locator('script[type="application/ld+json"]');
    const schema = JSON.parse((await jsonLd.textContent()) ?? '{}');
    expect(schema.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  test('es-ES out of stock label', async ({ page }) => {
    await page.goto('/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox');

    await expect(page.getByRole('button', { name: 'Agotado' })).toBeDisabled();
  });
});
