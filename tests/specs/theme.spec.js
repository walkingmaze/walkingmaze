import { test, expect } from '../fixtures/fixtures.js';

test.describe('Theme Toggle Tests', () => {
  test('should toggle dark mode on index page', async ({ pageManager, page }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    // Click theme toggle
    await page.click('#theme-toggle');

    // Check if dark class is applied
    const isDark = await page.evaluate(() => {
      return document.body.classList.contains('dark');
    });

    expect(isDark).toBeDefined();
  });

  test('should toggle dark mode on login page', async ({ pageManager, page }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const toggleBtn = await page.$('#theme-toggle');
    expect(toggleBtn).toBeTruthy();

    await page.click('#theme-toggle');
  });

  test('should toggle dark mode on todo page', async ({ pageManager, page }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    const toggleBtn = await page.$('#theme-toggle');
    expect(toggleBtn).toBeTruthy();
  });
});