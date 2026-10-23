import { test, expect, request } from '@playwright/test';

test.describe('Week 05 - Wednesday - POST Requests', () => {

    test('should create a new user', async () => {

        const apiContext = await request.newContext({
            ignoreHTTPSErrors: true
        });

        // Create payload
        const newUser = {
            name: 'Maya',
            job: 'QA Engineer'
        };

        // Send POST request
        const response = await apiContext.post('https://reqres.in/api/users', {
            data: newUser
        });

        // Validate status code
        expect(response.status()).toBe(201);

        // Convert response to JSON
        const responseBody = await response.json();

        // Print response
        console.log(JSON.stringify(responseBody, null, 2));

        await apiContext.dispose();

    });

});