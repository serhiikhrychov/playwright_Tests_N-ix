import { expect } from '@playwright/test';
import { mytest } from './base';

mytest.describe('Episodes page tests', () => {
  mytest.beforeEach(async ({ app }) => {
    await app.loginPage.open();
    await app.loginPage.loginAsAdmin();
  });

  mytest.afterEach(async ({ page }, testInfo) => {
    await page.close();
  });

  mytest('add and remove new episode', async ({ app }) => {
    await app.homePage.addNewEpisodeWithRandomTitle();
    await expect(app.homePage.successMessage).toBeVisible();

    await app.homePage.removeEpisodeByTitle(app.homePage.fakeEpisodeName);
    await app.homePage.confirmEpisodeRemoval();

    await app.homePage.assertEpisodeIsNotPresent(app.homePage.fakeEpisodeName);
  });
});
