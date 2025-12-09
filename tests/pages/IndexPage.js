import { BasePage } from './BasePage.js';

export class IndexPage extends BasePage {
  async navigateToHome() {
    await this.page.goto('index.html');  // Direct path to your local file
  }

  async clickLoginLink() {
    await this.click('a[href="login.html"]');
  }

  async clickTodoLink() {
    await this.click('a[href="todo.html"]');
  }

  async clickPersonalInfoLink() {
    await this.click('a[href="personal-information.html"]');
  }

  async click404Link() {
    await this.click('a[href="nonexistent.html"]');
  }

  async clickBrokenLink() {
    await this.click('[data-testid="broken-link-1"]');
  }

  async isHeadingVisible() {
    return await this.isVisible('h2');
  }

  async getPageTitle() {
    return await this.page.title();
  }
  
}