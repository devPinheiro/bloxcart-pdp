# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: images.spec.ts >> image optimizer serves a modern format when requested
- Location: e2e/images.spec.ts:34:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const PDP_PATH = '/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox';
  4  | 
  5  | test('hero image uses priority loading, explicit dimensions, and the image optimizer', async ({
  6  |   page,
  7  | }) => {
  8  |   await page.goto(PDP_PATH);
  9  | 
  10 |   const hero = page.getByTestId('gallery-hero');
  11 |   await expect(hero).toBeVisible();
  12 |   await expect(hero).toHaveAttribute('width', '150');
  13 |   await expect(hero).toHaveAttribute('height', '143');
  14 |   await expect(hero).toHaveAttribute('fetchpriority', 'high');
  15 |   await expect(hero).toHaveAttribute('loading', 'eager');
  16 | 
  17 |   const heroSrc = await hero.getAttribute('src');
  18 |   expect(heroSrc).toMatch(/\/_next\/image\?/);
  19 | });
  20 | 
  21 | test('thumbnail images lazy-load with low fetch priority', async ({ page }) => {
  22 |   await page.goto(PDP_PATH);
  23 | 
  24 |   const thumb = page.getByTestId('gallery-thumb-1').locator('img');
  25 |   await expect(thumb).toHaveAttribute('loading', 'lazy');
  26 |   await expect(thumb).toHaveAttribute('fetchpriority', 'low');
  27 |   await expect(thumb).toHaveAttribute('width', '150');
  28 |   await expect(thumb).toHaveAttribute('height', '143');
  29 | 
  30 |   const thumbSrc = await thumb.getAttribute('src');
  31 |   expect(thumbSrc).toMatch(/\/_next\/image\?/);
  32 | });
  33 | 
  34 | test('image optimizer serves a modern format when requested', async ({ request }) => {
  35 |   const response = await request.get(PDP_PATH);
  36 |   expect(response.ok()).toBeTruthy();
  37 |   const html = await response.text();
  38 |   const match = html.match(/\/_next\/image\?url=[^"'\\s]+/);
  39 |   expect(match).not.toBeNull();
  40 | 
  41 |   const imageResponse = await request.get(match![0], {
  42 |     headers: {
  43 |       Accept: 'image/avif,image/webp,image/*',
  44 |     },
  45 |   });
> 46 |   expect(imageResponse.ok()).toBeTruthy();
     |                              ^ Error: expect(received).toBeTruthy()
  47 | 
  48 |   const contentType = imageResponse.headers()['content-type'] ?? '';
  49 |   expect(contentType).toMatch(/image\/(avif|webp)/);
  50 | });
  51 | 
```