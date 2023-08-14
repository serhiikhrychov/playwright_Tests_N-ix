import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { Fakers } from "../helpers/fakers/randomStringGenerator";

export class HomePage extends BasePage {
  readonly episodeNameInput: Locator = this.page.locator("input#episodeName");
  readonly logoutBtn: Locator = this.page.getByRole("button", {
    name: "Logout",
  });
  readonly addEpisodeBtn: Locator = this.page.getByRole("button", {
    name: "Add episode",
  });
  readonly successMessage: Locator = this.page.locator(
    "//div[text()=' Your record sucesfully added! Thank you! ']"
  );
  readonly yesBtnInConfirmPopUp: Locator = this.page.locator(
    "//span[text()='Yes']"
  );

  readonly noBtnInConfirmPopUp: Locator = this.page.locator(
    "//span[text()='No']"
  );

  faker = new Fakers();
  fakeEpisodeName: string;

  async addNewEpisodeWithRandomTitle(): Promise<void> {
    this.fakeEpisodeName = this.faker.generateRandomString();
    await this.episodeNameInput.fill(this.fakeEpisodeName);
    await this.addEpisodeBtn.click();
  }

  async removeEpisodeByTitle(episodeTitle: string) {
    const formattedLocator = this.getEpisodeFormattedLocator(episodeTitle);
    const removeIcon = this.page.locator(formattedLocator);
    await removeIcon.click();
  }

  async confirmEpisodeRemoval(): Promise<void> {
    const yesBtnInConfirmPopUp = this.page.locator(
      this.getConfirmationButtonFormattedLocator("Yes")
    );
    await yesBtnInConfirmPopUp.click();
  }

  async assertEpisodeIsNotPresent(episodeTitle: string): Promise<void> {
    const formattedLocator = this.getEpisodeFormattedLocator(episodeTitle);
    const episode = this.page.locator(formattedLocator);
    await expect(episode).not.toBeVisible();
  }

  // Helper method to format the locator string
  private getEpisodeFormattedLocator(episodeTitle: string): string {
    return `//span[text()=' ${episodeTitle} ']//..//a`;
  }

  private getConfirmationButtonFormattedLocator(btnTitle: string): string {
    return `//span[text()='${btnTitle}']`;
  }
}
