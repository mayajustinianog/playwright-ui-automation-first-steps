import { test, expect } from '@playwright/test';

test('Block images using network interception', async ({ page }) => {

  await page.route(/\.(png|jpg|jpeg|webp)$/i, async route => {
    console.log('Blocked image:', route.request().url());
    await route.abort();
  });

  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});