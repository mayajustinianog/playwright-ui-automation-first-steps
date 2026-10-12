import { test, expect } from '@playwright/test';

const VALID_USER = {
    username: 'standard_user',
    password: 'secret_sauce',
};
test('La página de productos muestra 6 productos', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. TODO: Contar productos
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});
test('se muestra el producto "Sauce Labs Backpack"', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. TODO: Verificar que existe "Sauce Labs Backpack"
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
test('hay 6 botones "Add to cart" en la página', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. TODO: Contar botones "Add to cart"
    await expect(page.getByRole('button', { name: 'Add to car' })).toHaveCount(6);
});
test('agregar un producto actualiza el badge del carrito a "1"', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. TODO: Click en "Add to cart" del primer producto

    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // 3. TODO: Verificar que el badge muestra "1"
    await expect(page.getByRole('button', { name: /Cart/ })).toHaveText('1');
});
test('agregar 3 productos actualiza el badge del carrito a "3"', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // 3. El badge es el botón "Cart"; su texto es la cantidad de productos
    await expect(page.getByRole('button', { name: /Cart/ })).toHaveText('3');
});