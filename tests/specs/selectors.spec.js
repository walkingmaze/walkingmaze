import { test, expect } from '../fixtures/fixtures.js';

test.describe('Selector & Locator Tests (Module 5)', () => {
  test('should find login form by ID selector', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const formExists = await loginPage.page.$('#login-form');
    expect(formExists).toBeTruthy();
  });

  test('should find username input by ID', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const input = await loginPage.page.$('#username');
    expect(input).toBeTruthy();
  });

  test('should find password input by type attribute', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const input = await loginPage.page.$('input[type="password"]');
    expect(input).toBeTruthy();
  });

  test('should find submit button by ID', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    const button = await loginPage.page.$('#login-btn');
    expect(button).toBeTruthy();
  });

  test('should find todo list by ID', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    const list = await todoPage.page.$('#todo-list');
    expect(list).toBeTruthy();
  });

  test('should find todo items by class selector', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();

    await todoPage.addTask('Test task');

    const items = await todoPage.page.$$('.todo-item');
    expect(items.length).toBeGreaterThan(0);
  });

  test('should find delete buttons by class', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();
    await todoPage.addTask('Test task');

    await expect(todoPage.page.locator('.delete-btn')).toHaveCount(3);
  });

  test('should find theme toggle button', async ({ pageManager }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    const toggle = await indexPage.page.$('#theme-toggle');
    expect(toggle).toBeTruthy();
  });
});