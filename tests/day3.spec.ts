import { test } from '@playwright/test';

const VALID_USER = {
    username: 'standard_user',
    password: 'secret_sauce',
};
test('Click en el boton de login', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

});