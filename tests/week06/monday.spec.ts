import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
});

test('Verify Playwright page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
});

test('Verify Get Started link is visible', async ({ page }) => {
    await expect(
        page.getByRole('link', { name: 'Get started' })
    ).toBeVisible();
});