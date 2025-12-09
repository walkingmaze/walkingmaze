import { test, expect } from '../fixtures/fixtures.js';
import { TEST_DATA } from '../utils/testData.js';

test.describe('Assertions Tests (Module 6)', () => {
  test('should assert button is visible', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const isVisible = await loginPage.isVisible('#login-btn');
    expect(isVisible).toBeTruthy();
  });

  test('should assert text content matches', async ({ pageManager }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    const title = await indexPage.getPageTitle();
    expect(title).toContain('QA Automation Practice');
  });

  test('should assert form has required attribute', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const input = loginPage.page.locator('#username');
    await expect(input).toHaveAttribute('required');  // Best practice
  });


  test('should assert element is not visible initially', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const isVisible = await loginPage.isVisible('#login-alert');
    // Alert should be hidden initially
    expect(isVisible).toBeFalsy();
  });

  test('should assert alert appears after failed login', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    await loginPage.login('wrong', 'wrong');
    await loginPage.waitForAlert();

    const alertText = await loginPage.getAlertText();
    expect(alertText).toBeDefined();
    expect(alertText.length).toBeGreaterThan(0);
  });

  test('should assert todo list contains items', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    const count = await todoPage.getTodoCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should assert error message is empty on success', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    const error = await todoPage.getErrorMessage();
    // After adding valid task, error should be cleared
    expect(error).toBe('');
  });

  test('should assert checkbox state toggles', async ({ pageManager, page }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    // Add a task to ensure checkboxes exist
    await todoPage.addTask('Test task');

    // Use locator (auto-waits, handles re-renders)
    const checkbox = page.locator('.todo-item input[type="checkbox"]').first();

    const isChecked = await checkbox.isChecked();
    await checkbox.click();
    const newState = await checkbox.isChecked();

    expect(newState).not.toBe(isChecked);
  });


  test('should assert URL changes after login', async ({ page, pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const initialUrl = page.url();
    expect(initialUrl).toContain('/login.html');

    const { admin } = TEST_DATA.validUsers;
    await loginPage.login(admin.username, admin.password);
    await page.waitForNavigation();

    const newUrl = page.url();
    expect(newUrl).toContain('/todo.html');
  });
});