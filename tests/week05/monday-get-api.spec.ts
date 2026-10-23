import { test, expect } from '@playwright/test';

test.describe('Week 05 - Monday - Get Requests', () => {
    test.use({ ignoreHTTPSErrors: true });

    test('should get all users', async ({ request }) => {

        //Send Get Request
        const response = await request.get('https://reqres.in/api/users');

        //Validate Response
        expect(response.ok()).toBeTruthy();

        //Convert response to JSON
        const responseBody = await response.json();
        
        //Print response
        console.log(responseBody);
    });
});