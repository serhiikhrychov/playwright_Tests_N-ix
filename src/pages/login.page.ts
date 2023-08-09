import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly errorMessages: Locator = this.page.locator("div.errors");
  readonly loginBtn: Locator = this.page.getByRole("button", { name: "Login" });
  readonly usernameInput: Locator = this.page.getByLabel("Username");
  readonly passwordInput: Locator = this.page.getByLabel("Password");

  async open() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
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
