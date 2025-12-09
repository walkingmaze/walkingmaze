// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', currentTheme === 'dark');
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}
// Show logged-in user on all pages (including index.html)
const loggedInUser = localStorage.getItem('loggedInUser');
const welcomeElement = document.getElementById('welcome-user');
if (welcomeElement && loggedInUser) {
  welcomeElement.textContent = loggedInUser;
}

// Login Logic (login.html)
if (document.getElementById('login-form')) {
  const validUsers = {
    'admin': 'password123',
    'user': 'test@2025'
  };

  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const alert = document.getElementById('login-alert');

    if (validUsers[username] && validUsers[username] === password) {
      alert.textContent = `Welcome, ${username}! Redirecting...`;
      alert.className = 'alert success';
      alert.classList.remove('hidden');
      localStorage.setItem('loggedInUser', username);
      setTimeout(() => window.location.href = 'todo.html', 1500);
    } else {
      alert.textContent = 'Invalid username or password!';
      alert.className = 'alert error';
      alert.classList.remove('hidden');
    }
  });
}

// To-Do List Logic (todo.html)
if (document.getElementById('todo-list')) {
  const todoList = document.getElementById('todo-list');
  const newTodoInput = document.getElementById('new-todo');
  const addBtn = document.getElementById('add-todo-btn');
  const errorDiv = document.getElementById('todo-error');
  const clearCompletedBtn = document.getElementById('clear-completed');

  // Load from localStorage
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  let nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

  const user = localStorage.getItem('loggedInUser') || 'Guest';
  document.getElementById('welcome-user').textContent = user;

  function render() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.dataset.id = todo.id;
      li.innerHTML = `
        <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
        <label for="todo-${todo.id}">${todo.text}</label>
        <button class="delete-btn" aria-label="Delete">×</button>
      `;
      todoList.appendChild(li);
    });
    updateSummary();
  }

  function updateSummary() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('remaining-tasks').textContent = total - completed;
  }

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addBtn.addEventListener('click', addTodo);
  newTodoInput.addEventListener('keypress', e => e.key === 'Enter' && addTodo());

  function addTodo() {  // ← NEW SIMPLIFIED FUNCTION
    const text = newTodoInput.value.trim();
    if (!text) {
      errorDiv.textContent = 'Task cannot be empty!';
      return;
    }
    // HTML maxlength="100" handles length validation!
    errorDiv.textContent = '';
    todos.push({ id: nextId++, text, completed: false });
    save();
    render();
    newTodoInput.value = '';
  }


  todoList.addEventListener('click', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.type === 'checkbox') {
      const todo = todos.find(t => t.id === id);
      todo.completed = !todo.completed;
      save();
      render();
    }

    if (e.target.classList.contains('delete-btn')) {
      todos = todos.filter(t => t.id !== id);
      save();
      render();
    }
  });

  clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    save();
    render();
  });

  // Logout clears user (optional)
  document.getElementById('logout-link').addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });

  // Initialize with hardcoded tasks if empty
  if (todos.length === 0) {
    todos = [
      { id: 1, text: 'Practice Selenium WebDriver', completed: true },
      { id: 2, text: 'Write Cypress tests', completed: false }
    ];
    nextId = 3;
    save();
  }

  render();
}