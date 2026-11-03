import { test, expect } from '@playwright/test';

test('Verify Get Started link', async ({ page }) => {

  await page.goto('https://playwright.dev/');

  const getStartedLink = page.getByRole('link', {
    name: 'Start automation'
  });

  await expect(getStartedLink).toBeVisible();

});