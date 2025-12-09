import { test, expect } from '../fixtures/fixtures.js';
import { TEST_DATA } from '../utils/testData.js';

test.describe('End-to-End User Journeys', () => {
  test('complete user journey: login → add todos → mark complete', async ({ pageManager, page }) => {
    // Step 1: Navigate to home
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();
    expect(await indexPage.isHeadingVisible()).toBeTruthy();

    // Step 2: Navigate to login
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    // Step 3: Login with valid credentials
    const { admin } = TEST_DATA.validUsers;
    await loginPage.login(admin.username, admin.password);
    await page.waitForNavigation();

    // Step 4: Add multiple tasks
    const todoPage = pageManager.getTodoPage();
    await todoPage.addTask('Complete Playwright tests');
    await todoPage.addTask('Review POM pattern');

    // Step 5: Verify tasks were added
    const totalTasks = parseInt(await todoPage.getTotalTasks());
    expect(totalTasks).toBeGreaterThanOrEqual(2);

    // Step 6: Mark a task as complete
    await todoPage.checkTodoByIndex(0);

    // Step 7: Verify completion stats
    const completedTasks = parseInt(await todoPage.getCompletedTasks());
    expect(completedTasks).toBeGreaterThan(0);
  });

  test('complete user journey: failed login attempts', async ({ pageManager }) => {
    const loginPage = pageManager.getLoginPage();
    await loginPage.navigateToLogin();

    // Attempt 1: Invalid credentials
    await loginPage.login('invalid', 'wrong');
    await loginPage.waitForAlert();
    let alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Invalid');

    // Attempt 2: Wrong password
    const { admin } = TEST_DATA.validUsers;
    await loginPage.page.reload();
    
    await loginPage.login(admin.username, 'wrongpass');
    await loginPage.waitForAlert();
    alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Invalid');

    // Attempt 3: Correct credentials
    await loginPage.page.reload();
    await loginPage.login(admin.username, admin.password);
    await loginPage.waitForAlert();
    alertText = await loginPage.getAlertText();
    expect(alertText).toContain('Welcome');
  });

  test('navigation between pages', async ({ pageManager, page }) => {
    const indexPage = pageManager.getIndexPage();
    await indexPage.navigateToHome();

    // Navigate to personal info
    await indexPage.clickPersonalInfoLink();
    expect(page.url()).toContain('personal-information.html');

    // Navigate back to home
    await page.goto('/');
    expect(page.url()).toContain('/');
  });
});