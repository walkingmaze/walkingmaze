import { test, expect } from '../fixtures/fixtures.js';
import { TEST_DATA } from '../utils/testData.js';

test.describe('Login Functionality Tests', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getLoginPage().navigateToLogin();
  });

  // Valid Login Tests
  test('should login successfully with valid admin credentials', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    const { admin } = TEST_DATA.validUsers;

    await loginPage.login(admin.username, admin.password);
    await loginPage.waitForAlert();

    const alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Welcome, admin!');
  });

  test('should login successfully with valid user credentials', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    const { user } = TEST_DATA.validUsers;

    await loginPage.login(user.username, user.password);
    await loginPage.waitForAlert();

    const alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Welcome, user!');
  });

  // Invalid Login Tests
  test('should show error for invalid credentials', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();

    await loginPage.login('invaliduser', 'wrongpass');
    await loginPage.waitForAlert();

    const alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Invalid username or password!');
  });

  test('should show error when password is incorrect', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    const { admin } = TEST_DATA.validUsers;

    await loginPage.login(admin.username, 'wrongpass');
    await loginPage.waitForAlert();

    const alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Invalid');
  });

  test('should show error for empty username', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();

    await loginPage.login('', 'password123');
    // HTML5 validation should prevent submission
    // Or check error state
  });

  test('should redirect to todo page after successful login', async ({ page, pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    const { admin } = TEST_DATA.validUsers;

    await loginPage.login(admin.username, admin.password);

    // Wait for navigation
    await page.waitForNavigation();

    expect(page.url()).toContain('/todo.html');
  });

  test('should display alert success class on valid login', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    const { user } = TEST_DATA.validUsers;

    await loginPage.login(user.username, user.password);
    await loginPage.waitForAlert();

    const alertElement = await loginPage.page.$('.alert.success');
    expect(alertElement).toBeTruthy();
  });

  test('should display alert error class on invalid login', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();

    await loginPage.login('wrong', 'wrong');
    await loginPage.waitForAlert();

    const alertElement = await loginPage.page.$('.alert.error');
    expect(alertElement).toBeTruthy();
  });
});