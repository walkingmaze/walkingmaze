import { BasePage } from './BasePage.js';
import { SELECTORS } from '../utils/testData.js';

export class TodoPage extends BasePage {
  get newTodoInput() {
    return SELECTORS.todo.newTodoInput;
  }

  get addBtn() {
    return SELECTORS.todo.addBtn;
  }

  get todoList() {
    return SELECTORS.todo.todoList;
  }

  get todoItems() {
    return SELECTORS.todo.todoItem;
  }

  get errorDiv() {
    return SELECTORS.todo.errorDiv;
  }

  get totalTasksSpan() {
    return SELECTORS.todo.totalTasks;
  }

  get completedTasksSpan() {
    return SELECTORS.todo.completedTasks;
  }

  get remainingTasksSpan() {
    return SELECTORS.todo.remainingTasks;
  }

  get clearCompletedBtn() {
    return SELECTORS.todo.clearCompletedBtn;
  }

  async navigateToTodo() {
    await this.page.goto('todo.html');
  }

  async enterTask(taskText) {
    await this.fill(this.newTodoInput, taskText);
  }

  async clickAddTask() {
    await this.click(this.addBtn);
  }

  async addTask(taskText) {
    await this.enterTask(taskText);
    await this.clickAddTask();
  }

  async getTodoCount() {
    const items = await this.page.$$eval(this.todoItems, (elements) => elements.length);
    return items;
  }

  async getErrorMessage() {
  const errorBox = this.page.locator('#todo-error');
  await errorBox.waitFor({ state: 'visible', timeout: 3000 });
  return await errorBox.textContent();
}

  async getTotalTasks() {
    return await this.getText(this.totalTasksSpan);
  }

  async getCompletedTasks() {
    return await this.getText(this.completedTasksSpan);
  }

  async getRemainingTasks() {
    return await this.getText(this.remainingTasksSpan);
  }

  async checkTodoByIndex(index) {
  const checkbox = this.page.locator(SELECTORS.todo.checkbox).nth(index);
  await checkbox.check();
}

  async deleteTodoByIndex(index) {
    const deleteButtons = await this.page.$$(SELECTORS.todo.deleteBtn);
    if (deleteButtons[index]) {
      await deleteButtons[index].click();
    }
  }

  async clearCompleted() {
    await this.click(this.clearCompletedBtn);
  }

  async isTodoListVisible() {
    return await this.isVisible(this.todoList);
  }
}