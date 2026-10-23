import { test, expect, request } from '@playwright/test';

test.describe('Week 05 - Tuesday - GET Validations', () => {

  test('should validate users response', async () => {

    const apiContext = await request.newContext({
      ignoreHTTPSErrors: true
    });

    // Send GET request
    const response = await apiContext.get('https://reqres.in/api/users');

    // Validate status code
    expect(response.status()).toBe(200);

    // Convert response to JSON
    const responseBody = await response.json();

    // Validate response contains data
    expect(responseBody.data.length).toBeGreaterThan(0);

    // Print response
    console.log(JSON.stringify(responseBody, null, 2));

    await apiContext.dispose();

  });

});