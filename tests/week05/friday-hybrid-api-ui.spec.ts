import { test, expect } from '@playwright/test';
import users from '../data/users.json';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Week 05 - Friday - Hybrid API + UI', () => {
    test.use({ ignoreHTTPSErrors: true });

    test('should create data via API and validate it in UI',
        async ({ request, page }) => {

            // 1. Prepare test data
            const newUser = {
                name: 'Maya',
                job: 'QA Engineer'
            };

            // 2. Create data via API. Absolute URL so baseURL (Sauce Demo) is not used.
            const response = await request.post('https://reqres.in/api/users', {
                data: newUser
            });

            // 3. Validate API response
            expect(response.status()).toBe(201);

            const responseBody = await response.json();

            // 4. Extract generated ID
            const userId = responseBody.id;

            expect(userId).toBeTruthy();
            expect(responseBody.name).toBe(newUser.name);
            expect(responseBody.job).toBe(newUser.job);

            // 5. Open the application (baseURL is http://saucedemo.com)
            const loginPage = new LoginPage(page);
            await page.goto('/');

            // 6. Locate the logged-in inventory.
            // ReqRes does not store the created user and Sauce Demo is a different app,
            // so the name from the API cannot appear on this screen.
            await loginPage.login(
                users.validUser.username,
                users.validUser.password
            );

            // 7. Validate that the information is visible
            await expect(page).toHaveURL(/inventory.html/);
            await expect(page.getByText('Products')).toBeVisible();

        });

});
