import { test, expect, request } from '@playwright/test';

test.describe('Week 05 - Thursday - API Chaining', () => {

  test('should create a user and get the user by ID', async () => {

    const apiContext = await request.newContext({
      ignoreHTTPSErrors: true
    });

    // Create payload
    const newUser = {
      name: 'Maya',
      job: 'QA Engineer'
    };

    // POST - Create user
    const postResponse = await apiContext.post(
      'https://reqres.in/api/users',
      {
        data: newUser
      }
    );

    expect(postResponse.status()).toBe(201);

    // Get POST response body
    const postResponseBody = await postResponse.json();

    // Extract generated ID
    const userId = postResponseBody.id;

    expect(userId).toBeTruthy();
    expect(postResponseBody.name).toBe(newUser.name);
    expect(postResponseBody.job).toBe(newUser.job);

    console.log('Created user ID:', userId);

    // ReqRes does not store POST users, so GET /users/{createdId} returns 404.
    // Chain a real id from the users list into the next request.
    const listResponse = await apiContext.get('https://reqres.in/api/users?page=1');

    expect(listResponse.status()).toBe(200);

    const listResponseBody = await listResponse.json();
    const existingUserId = listResponseBody.data[0].id;

    expect(existingUserId).toBeTruthy();

    const getResponse = await apiContext.get(
      `https://reqres.in/api/users/${existingUserId}`
    );

    expect(getResponse.status()).toBe(200);

    const getResponseBody = await getResponse.json();

    expect(getResponseBody.data.id).toBe(existingUserId);

    console.log(JSON.stringify(getResponseBody, null, 2));

    await apiContext.dispose();

  });

});