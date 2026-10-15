import { test, expect } from '@playwright/test';
import users from '../data/users.json';
import { LoginPage } from '../../pages/LoginPage';

test('Login with JSON file', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(users.validUser.username, users.validUser.password);

    //await expect(page.getByText('Products')).toBeVisible();
});
