import { test } from '@playwright/test';
import users from '../data/users.json';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - Data Driven Testing', () => {

    test('Login with Valid User', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );
    });

    test('Login with locked_out_user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');

        await loginPage.login(
            users.locked_out_user.username,
            users.locked_out_user.password
        );
    });

    test('Login with problem_user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');

        await loginPage.login(
            users.problem_user.username,
            users.problem_user.password
        );
    });

});
