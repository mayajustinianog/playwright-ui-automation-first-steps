import { test } from '@playwright/test';
const VALID_USER = {
    username: 'Maya Justiniano',
    email: 'maya.justiniano@gmail.com',
    password: 'secret_sauce',
};
test('Navega a la pagina web, selecciona una opcion del menu desplegable y marca una casilla de verificacion', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

    await page.getByText('Auth').click();
    await page.getByText('Register').click();
    await page.getByPlaceholder('Full name').fill(VALID_USER.username);
    await page.getByPlaceholder('Email address').fill(VALID_USER.email);
    await page.getByPlaceholder('Password', { exact: true }).fill(VALID_USER.password);
    await page.getByPlaceholder('Confirm Password').fill(VALID_USER.password);
    await page.getByLabel('Agree to Terms & Conditions').check({ force: true });
    await page.getByRole('button', { name: 'Register' }).click();
}); 