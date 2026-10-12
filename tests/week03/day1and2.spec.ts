import { test } from '@playwright/test';

test('Navega a la pagina web, encuentra un texto y un boton', async ({ page }) => {
  await page.goto('/');

  const usernameInput = page.getByPlaceholder('Username');
  const loginButton = page.getByRole('button', { name: 'Login' });

  await usernameInput.waitFor(); // confirma que el campo de texto ya apareció
  await loginButton.waitFor();   // confirma que el botón ya apareció
});
