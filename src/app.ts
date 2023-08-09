import { Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { MainPage } from "./pages/main.page";

export class App {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly mainPage: MainPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.mainPage = new MainPage(page);
  }
}
