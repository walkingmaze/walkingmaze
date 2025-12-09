export const TEST_DATA = {
  // Valid login credentials
  validUsers: {
    admin: {
      username: 'admin',
      password: 'password123',
    },
    user: {
      username: 'user',
      password: 'test@2025',
    },
  },
  
  // Invalid credentials
  invalidUsers: [
    { username: 'invaliduser', password: 'wrongpass' },
    { username: 'admin', password: 'wrongpass' },
    { username: '', password: 'password123' },
  ],
  
  // Todo items
  todos: {
    validTask: 'Practice Playwright automation testing',
    emptyTask: '',
    longTask: 'a'.repeat(101), // Exceeds 100 char limit
    maxLengthTask: 'b'.repeat(100),
  },
  
  // URLs
  urls: {
    base: 'https://walkingmaze.github.io/walkingmaze/',
    login: 'login.html',
    todo: 'todo.html',
    personalInfo: 'personal-information.html',
    nonexistent: 'nonexistent.html',
    brokenLink: 'page-does-not-exist.html',
  },
  
  // Timeouts
  timeouts: {
    short: 1000,      // 1 second
    medium: 3000,     // 3 seconds
    long: 10000,      // 10 seconds
  },
};

export const SELECTORS = {
  login: {
    form: '#login-form',
    usernameInput: '#username',
    passwordInput: '#password',
    submitBtn: '#login-btn',
    alert: '#login-alert',
    alertText: '#login-alert',
  },
  todo: {
    newTodoInput: '#new-todo',
    addBtn: '#add-todo-btn',
    todoList: '#todo-list',
    todoItem: '.todo-item',
    checkbox: 'input[type="checkbox"]',
    deleteBtn: '.delete-btn',
    errorDiv: '#todo-error',
    totalTasks: '#total-tasks',
    completedTasks: '#completed-tasks',
    remainingTasks: '#remaining-tasks',
    clearCompletedBtn: '#clear-completed',
  },
  common: {
    themeToggle: '#theme-toggle',
    welcomeUser: '#welcome-user',
    logoutLink: '#logout-link',
  },
};