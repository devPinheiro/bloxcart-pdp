import { test, expect } from '@playwright/test';

const PDP_PATH = '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox';
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';

test('hero image uses priority loading, explicit dimensions, and the image optimizer', async ({
  page,
}) => {
  await page.goto(PDP_PATH);

  const hero = page.getByTestId('gallery-hero');
  await expect(hero).toBeVisible();
  await expect(hero).toHaveAttribute('fetchpriority', 'high');
  await expect(hero).toHaveAttribute('loading', 'eager');

  const heroSrc = await hero.getAttribute('src');
  expect(heroSrc).toMatch(/\/_next\/image\?/);
});

test('thumbnail images lazy-load with low fetch priority', async ({ page }) => {
  await page.goto(PDP_PATH);

  const thumb = page.getByTestId('gallery-thumb-1').locator('img');
  await expect(thumb).toHaveAttribute('loading', 'lazy');
  await expect(thumb).toHaveAttribute('fetchpriority', 'low');
  await expect(thumb).toHaveAttribute('width', '46');
  await expect(thumb).toHaveAttribute('height', '46');

  const thumbSrc = await thumb.getAttribute('src');
  expect(thumbSrc).toMatch(/\/_next\/image\?/);
});

test('image optimizer serves a modern format when requested', async ({ request }) => {
  const pageResponse = await request.get(`${BASE_URL}${PDP_PATH}`);
  expect(pageResponse.ok()).toBeTruthy();

  const html = await pageResponse.text();
  const match = html.match(/\/_next\/image\?url=[^"'\\s]+/);
  expect(match).not.toBeNull();

  const imageResponse = await request.get(`${BASE_URL}${match![0]}`, {
    headers: {
      Accept: 'image/avif,image/webp,image/*',
    },
  });
  expect(imageResponse.ok()).toBeTruthy();

  const contentType = imageResponse.headers()['content-type'] ?? '';
  expect(contentType).toMatch(/image\/(avif|webp)/);
});
