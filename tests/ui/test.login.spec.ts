import { expect } from '@playwright/test';
import { mytest } from './base';

mytest.describe('Login page tests', () => {
  mytest.beforeEach(async ({ app }) => {
    await app.loginPage.open();
    await app.loginPage.loginAsAdmin();
  });

  mytest.afterEach(async ({ page }, testInfo) => {
    await page.close();
  });

  mytest('login with valid cred', async ({ app }) => {
    await expect(app.homePage.logoutBtn).toBeVisible();
  });

  mytest('user is able to logout', async ({ app }) => {
    await app.homePage.logoutBtn.click();

    await expect(app.loginPage.loginBtn).toBeVisible();
  });

  mytest(
    'login and password field are marked red if no data',
    async ({ app }) => {
      await app.loginPage.assertFieldsAreRed();
    }
  );
});
