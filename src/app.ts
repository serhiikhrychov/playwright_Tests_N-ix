import { Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { HomePage } from "./pages/home.page";

export class App {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }
}
