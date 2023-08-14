import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;

export class LoginPage extends BasePage {
  readonly errorMessages: Locator = this.page.locator("div.errors");
  readonly loginBtn: Locator = this.page.getByRole("button", { name: "Login" });
  readonly usernameInput: Locator = this.page.getByLabel("Username");
  readonly passwordInput: Locator = this.page.getByLabel("Password");

  async open() {
    await this.page.goto("/login");
  }

  async loginAsAdmin(): Promise<void> {
    if (username && password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginBtn.click();
    } else {
      console.log("No username or password provided");
    }
  }

  async assertFieldsAreRed(): Promise<void> {
    console.log(await this.usernameInput.getAttribute("class"));
    expect(await this.usernameInput.getAttribute("class")).toContain(
      "ng-touched"
    );
    expect(await this.passwordInput.getAttribute("class")).toContain(
      "ng-touched"
    );
  }
}
