import { BasePage } from './BasePage.js';
import { SELECTORS } from '../utils/testData.js';

export class LoginPage extends BasePage {
  get usernameInput() {
    return SELECTORS.login.usernameInput;
  }

  get passwordInput() {
    return SELECTORS.login.passwordInput;
  }

  get submitBtn() {
    return SELECTORS.login.submitBtn;
  }

  get alertElement() {
    return SELECTORS.login.alert;
  }

  async navigateToLogin() {
    await this.page.goto('login.html');
  }

  async fillUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async fillPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.submitBtn);
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async getAlertText() {
    return await this.getText(this.alertElement);
  }

  async isAlertVisible() {
    return await this.isVisible(this.alertElement);
  }

  async waitForAlert() {
    await this.waitForSelector(this.alertElement);
  }
}