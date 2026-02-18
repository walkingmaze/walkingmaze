import { test, expect } from '../fixtures/fixtures.js';
import { TEST_DATA } from '../utils/testData.js';

test.describe('Todo List Functionality Tests', () => {
  // Navigate directly to todo page (no login needed)
  test.beforeEach(async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    await todoPage.navigateToTodo();
  });

  // Add Todo Tests
  test('should add a new task successfully', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { validTask } = TEST_DATA.todos;

    const initialCount = await todoPage.getTodoCount();
    await todoPage.addTask(validTask);

    const finalCount = await todoPage.getTodoCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should not add empty task', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();

    await todoPage.clickAddTask();

    const errorMsg = await todoPage.getErrorMessage();
    expect(errorMsg).toContain('Task cannot be empty!');
  });

  test('should enforce 100-char maxlength on task input', async ({ pageManager, page }) => {
  const todoPage = pageManager.getTodoPage();

  // Navigate to todo page
  await todoPage.navigateToTodo();

  const input = page.getByPlaceholder('Add a new task...');

  // Type more than 100 characters
  const overlong = 'x'.repeat(150);
  await input.fill(''); // ensure empty
  await input.type(overlong);

  // Expect input value length to be exactly 100
  const value = await input.inputValue();
  expect(value.length).toBe(100);
});

  test('should allow task with exactly 100 characters', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { maxLengthTask } = TEST_DATA.todos;

    const initialCount = await todoPage.getTodoCount();
    await todoPage.addTask(maxLengthTask);

    const finalCount = await todoPage.getTodoCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  // Checkbox Tests
  test('should mark task as completed', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { validTask } = TEST_DATA.todos;

    await todoPage.addTask(validTask);
    await todoPage.checkTodoByIndex(0);

    const completedCount = await todoPage.getCompletedTasks();
    expect(parseInt(completedCount)).toBeGreaterThan(0);
  });

  // Delete Tests
  test('should delete a task', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { validTask } = TEST_DATA.todos;

    await todoPage.addTask(validTask);
    const countBefore = await todoPage.getTodoCount();

    await todoPage.deleteTodoByIndex(countBefore - 1);

    const countAfter = await todoPage.getTodoCount();
    expect(countAfter).toBe(countBefore - 1);
  });

  // Clear Completed Tests
  test('should clear all completed tasks', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { validTask } = TEST_DATA.todos;

    await todoPage.addTask(validTask);
    await todoPage.addTask(validTask + ' 2');
    await todoPage.checkTodoByIndex(0);

    await todoPage.clearCompleted();

    const totalTasks = parseInt(await todoPage.getTotalTasks());
    const completedTasks = parseInt(await todoPage.getCompletedTasks());

    expect(completedTasks).toBe(0);
  });

  // Summary Tests
  test('should update task summary correctly', async ({ pageManager }) => {
    const todoPage = pageManager.getTodoPage();
    const { validTask } = TEST_DATA.todos;

    const initialTotal = parseInt(await todoPage.getTotalTasks());

    await todoPage.addTask(validTask);

    const newTotal = parseInt(await todoPage.getTotalTasks());
    expect(newTotal).toBe(initialTotal + 1);
  });

  test('should calculate remaining tasks correctly', async ({ pageManager }) => {
  const todoPage = pageManager.getTodoPage();
  const { validTask } = TEST_DATA.todos;  // Gets "Practice Playwright..."

  const initialRemaining = parseInt(await todoPage.getRemainingTasks());  // =1
  
  await todoPage.addTask(validTask);  // Now 2 incomplete → remaining = 2
  const afterAdd = parseInt(await todoPage.getRemainingTasks());
  expect(afterAdd).toBe(initialRemaining + 1);

  await todoPage.checkTodoByIndex(2);  // Check the NEW task (index 2: 0=completed, 1=Cypress, 2=new)
  const newRemaining = parseInt(await todoPage.getRemainingTasks());
  expect(newRemaining).toBe(afterAdd - 1);  // Now 1 incomplete → remaining = 1
});

});