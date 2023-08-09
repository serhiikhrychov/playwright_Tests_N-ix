import { expect } from "@playwright/test";
import { mytest } from "./base";

mytest("login with valid cred", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login("admin", "123456");

  await expect(app.mainPage.logoutBtn).toBeVisible();
});

mytest("user is able to logout", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login("admin", "123456");

  await app.mainPage.logoutBtn.click();

  await expect(app.loginPage.loginBtn).toBeVisible();
});

mytest(
  "login and password field are marked red if no data",
  async ({ app }) => {
    await app.loginPage.open();
    await app.loginPage.login("", "");

    await app.loginPage.assertFieldsAreRed();
  }
);
