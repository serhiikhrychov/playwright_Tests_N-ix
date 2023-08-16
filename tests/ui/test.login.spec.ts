import { expect } from "@playwright/test";
import { mytest } from "./base";

mytest("login with valid cred", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.loginAsAdmin();

  await expect(app.homePage.logoutBtn).toBeVisible();
});

mytest("user is able to logout", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.loginAsAdmin();

  await app.homePage.logoutBtn.click();

  await expect(app.loginPage.loginBtn).toBeVisible();
});

mytest(
  "login and password field are marked red if no data",
  async ({ app }) => {
    await app.loginPage.open();
    await app.loginPage.loginAsAdmin();

    await app.loginPage.assertFieldsAreRed();
  }
);
