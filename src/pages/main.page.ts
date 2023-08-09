import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  readonly logoutBtn: Locator = this.page.getByRole("button", {
    name: "Logout",
  });
}
