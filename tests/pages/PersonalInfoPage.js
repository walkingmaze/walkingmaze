import { BasePage } from './BasePage.js';

export class PersonalInfoPage extends BasePage {
  async navigateToPersonalInfo() {
    await this.page.goto('/personal-information.html');
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async isContactCardVisible() {
    return await this.isVisible('h4');
  }

  async getContactEmail() {
    return await this.getText('p');
  }

  async getExperienceSections() {
    return await this.page.$$eval('li', (elements) =>
      elements.map((el) => el.textContent)
    );
  }
}