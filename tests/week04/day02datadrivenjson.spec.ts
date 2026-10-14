import { test, expect } from '@playwright/test';
import users from '../data/users.json';

test('Login with JSON file', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(users.validUser.username);
    await page.getByPlaceholder('Password').fill(users.validUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
});
