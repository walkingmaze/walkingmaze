import { test, expect } from '../fixtures/fixtures.js';

test.describe('Navigation Tests (Module 1-2 & 4)', () => {
  test('should navigate to home page', async ({ pageManager }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    const isVisible = await indexPage.isHeadingVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should navigate to login page from home', async ({ pageManager, page }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    await indexPage.clickLoginLink();

    expect(page.url()).toContain('/login.html');
  });

  test('should navigate to todo page', async ({ pageManager, page }) => {
  const todoPage = pageManager.getTodoPage();
  await todoPage.navigateToTodo();

  expect(page.url()).toContain('/todo.html');
  await todoPage.addTask('Test task');  // Populates list, makes it visible
  await expect(todoPage.page.locator('#todo-list')).toBeVisible();
});


  test('should navigate to personal info page', async ({ pageManager, page }) => {
    const infoPage = pageManager.getPersonalInfoPage();
    await infoPage.navigateToPersonalInfo();

    expect(page.url()).toContain('personal-information.html');
  });

  test('should handle nonexistent page gracefully', async ({ pageManager, page }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    await indexPage.click404Link();

    // Should display 404 page
    expect(page.url()).toContain('nonexistent.html');
  });

  test('should handle broken links (404 response)', async ({ pageManager, page }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    // This should result in a 404 response
    const response = await page.goto('/page-does-not-exist.html', { waitUntil: 'networkidle' });
    expect(response.status()).toBe(404);
  });
});