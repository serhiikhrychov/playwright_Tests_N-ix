import { test, expect } from '@playwright/test';

let accessToken: string;
let tokenType: string;

test.beforeAll(async ({ request }) => {
  const loginResponse = await request.post(
    'http://localhost:8087/api/gateway/auth/signin',
    {
      data: { usernameOrEmail: 'admin', password: '123456' },
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginResponseBody = await loginResponse.json();
  expect(loginResponseBody.accessToken).toBeTruthy();

  accessToken = loginResponseBody.accessToken;
  tokenType = loginResponseBody.tokenType;
});

test('set episode', async ({ request }) => {
  const setEpisodeResponse = await request.post(
    'http://localhost:8087/api/episodes',
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
      data: { name: 'testEpisode' },
    }
  );

  expect(setEpisodeResponse.status()).toBe(200);
  expect(setEpisodeResponse.ok()).toBeTruthy();

  const episodeResponseBody = await setEpisodeResponse.json();

  expect(episodeResponseBody).toHaveProperty('created');
});

test('get episode', async ({ request }) => {
  const getEpisodeResponse = await request.get(
    'http://localhost:8087/api/episodes',
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    }
  );

  expect(getEpisodeResponse.status()).toBe(200);
  expect(getEpisodeResponse.ok()).toBeTruthy();

  const episodeResponseBody = await getEpisodeResponse.json();

  episodeResponseBody.forEach((episode: any) => {
    expect(episode).toHaveProperty('id');
    expect(episode).toHaveProperty('name', 'testEpisode');
  });
});
