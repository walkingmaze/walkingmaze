This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
css/
  style.css
js/
  script.js
index.html
login.html
nonexistent.html
personal-information.html
README.md
repomix-output.xml
todo.html
```

# Files

## File: login.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login | QA Practice Site</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container header-flex">
      <h1>QA Practice</h1>
      <button id="theme-toggle" aria-label="Toggle dark/light mode">🌙</button>
    </div>
  </header>

  <main class="container">
    <div class="login-card">
      <h2>Login to Your Account</h2>
      <form id="login-form" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required autocomplete="username" />
          <span class="error-msg" id="username-error"></span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required autocomplete="current-password" />
          <span class="error-msg" id="password-error"></span>
        </div>

        <button type="submit" id="login-btn">Login</button>
      </form>

      <!-- Success / Error Alert -->
      <div id="login-alert" class="alert hidden"></div>

      <div class="credentials-hint">
        <p><strong>Test Credentials:</strong></p>
        <ul>
          <li>Valid: <code>admin</code> / <code>password123</code></li>
          <li>Valid: <code>user</code> / <code>test@2025</code></li>
          <li>Any other → Invalid</li>
        </ul>
      </div>
    </div>
  </main>

  <script src="js/script.js"></script>
</body>
</html>
```

## File: README.md
```markdown
## Hi there 👋

<!--
**walkingmaze/walkingmaze** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

## File: js/script.js
```javascript
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

  document.getElementById('login-form').addEventListener('submit', function(e) {
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

  function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) {
      errorDiv.textContent = 'Task cannot be empty!';
      return;
    }
    if (text.length > 100) {
      errorDiv.textContent = 'Task too long (max 100 chars)';
      return;
    }
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

  render();
}
```

## File: repomix-output.xml
```xml
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
css/
  style.css
js/
  script.js
index.html
login.html
nonexistent.html
personal-information.html
README.md
todo.html
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="login.html">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login | QA Practice Site</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container header-flex">
      <h1>QA Practice</h1>
      <button id="theme-toggle" aria-label="Toggle dark/light mode">🌙</button>
    </div>
  </header>

  <main class="container">
    <div class="login-card">
      <h2>Login to Your Account</h2>
      <form id="login-form" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required autocomplete="username" />
          <span class="error-msg" id="username-error"></span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required autocomplete="current-password" />
          <span class="error-msg" id="password-error"></span>
        </div>

        <button type="submit" id="login-btn">Login</button>
      </form>

      <!-- Success / Error Alert -->
      <div id="login-alert" class="alert hidden"></div>

      <div class="credentials-hint">
        <p><strong>Test Credentials:</strong></p>
        <ul>
          <li>Valid: <code>admin</code> / <code>password123</code></li>
          <li>Valid: <code>user</code> / <code>test@2025</code></li>
          <li>Any other → Invalid</li>
        </ul>
      </div>
    </div>
  </main>

  <script src="js/script.js"></script>
</body>
</html>
</file>

<file path="README.md">
## Hi there 👋

<!--
**walkingmaze/walkingmaze** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
</file>

<file path="js/script.js">
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

  document.getElementById('login-form').addEventListener('submit', function(e) {
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

  function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) {
      errorDiv.textContent = 'Task cannot be empty!';
      return;
    }
    if (text.length > 100) {
      errorDiv.textContent = 'Task too long (max 100 chars)';
      return;
    }
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

  render();
}
</file>

<file path="todo.html">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>To-Do List | QA Practice Site</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container header-flex">
      <h1>QA Practice</h1>
      <div class="header-right">
        <span>Welcome, <strong id="welcome-user">Guest</strong>!</span>
        <a href="login.html" id="logout-link" class="btn-small">Logout</a>
        <button id="theme-toggle" aria-label="Toggle dark/light mode">🌙</button>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="todo-section">
      <h2>My To-Do List</h2>

      <div class="todo-add">
        <input type="text" id="new-todo" placeholder="Add a new task..." maxlength="100" required />
        <button id="add-todo-btn">Add Task</button>
      </div>
      <div id="todo-error" class="error-msg"></div>

      <ul id="todo-list">
        <!-- Items injected by JS -->
        <li class="todo-item" data-id="1">
          <input type="checkbox" id="todo-1" checked />
          <label for="todo-1">Practice Selenium WebDriver</label>
          <button class="delete-btn" aria-label="Delete task">×</button>
        </li>
        <li class="todo-item" data-id="2">
          <input type="checkbox" id="todo-2" />
          <label for="todo-2">Write Cypress tests</label>
          <button class="delete-btn" aria-label="Delete task">×</button>
        </li>
      </ul>

      <div class="todo-summary">
        <p>Total: <span id="total-tasks">2</span> | 
           Completed: <span id="completed-tasks">1</span> | 
           Remaining: <span id="remaining-tasks">1</span></p>
        <button id="clear-completed" class="btn-small">Clear Completed</button>
      </div>
    </section>
  </main>

  <script src="js/script.js"></script>
</body>
</html>
</file>

<file path="nonexistent.html">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>404 - Page Not Found</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="error-page container">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <div class="btn-container">
      <a href="index.html" class="btn">Go Home</a>
      <a href="javascript:history.back()" class="btn-secondary">Go Back</a>
    </div>
  </div>
  <script src="js/script.js"></script>
</body>
</html>
</file>

<file path="css/style.css">
/* Reset & Base */
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: system-ui, sans-serif; line-height: 1.6; transition: background 0.3s, color 0.3s; }
.container { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
header { background: #333; color: #fff; padding: 1rem 0; margin-bottom: 2rem; }
.header-flex { display: flex; justify-content: space-between; align-items: center; }
h1 { font-size: 1.8rem; }
button { cursor: pointer; }

/* Dark Mode */
body.dark { background: #121212; color: #e0e0e0; }
body.dark header { background: #1f1f1f; }
body.dark .login-card, body.dark .todo-section { background: #1e1e1e; }

/* Components */
.login-card, .todo-section {
  background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: .5rem; font-weight: 600; }
input[type=text], input[type=password] {
  width: 100%; padding: .8rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem;
}
button[type=submit], #add-todo-btn, .btn {
  background: #0066ff; color: white; border: none; padding: .8rem 1.2rem; border-radius: 6px; font-size: 1rem;
}
button[type=submit]:hover, #add-todo-btn:hover { background: #0050cc; }

.alert { padding: 1rem; border-radius: 6px; margin: 1rem 0; }
.alert.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.alert.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.hidden { display: none; }

.todo-add { display: flex; gap: 10px; margin-bottom: 1.5rem; }
#new-todo { flex: 1; padding: .8rem; font-size: 1rem; }
#todo-list { list-style: none; }
.todo-item {
  display: flex; align-items: center; padding: .8rem; background: #f9f9f9; margin-bottom: .5rem; border-radius: 6px;
}
.todo-item.completed label { text-decoration: line-through; opacity: 0.6; }
.delete-btn {
  margin-left: auto; background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 1.2rem;
}
.error-msg { color: #e74c3c; font-size: 0.9rem; min-height: 1.2em; display: block; }

.hero { text-align: center; margin: 3rem 0; }
.hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
.hero p { font-size: 1.2rem; color: #555; }
body.dark .hero p { color: #bbb; }

.practice-links h3 { margin: 3rem 0 1.5rem; text-align: center; }
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.card {
  background: #fff;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.error-page {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.error-page h1 {
  font-size: 8rem;
  color: #0066ff;
  margin-bottom: 1rem;
  font-weight: 300;
}
.error-page p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 500px;
  color: #666;
}
.btn-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.btn, .btn-secondary {
  display: inline-block;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
  min-width: 120px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.btn {
  background: #0066ff;
  color: white;
}
.btn:hover {
  background: #0050cc;
  transform: translateY(-2px);
}
.btn-secondary {
  background: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}
body.dark .error-page h1 { color: #4dabf7; }
body.dark .error-page p { color: #bbb; }
body.dark .btn-secondary { background: #495057; }
body.dark .btn-secondary:hover { background: #545b62; }
@media (max-width: 600px) {
  .btn-container { flex-direction: column; align-items: center; gap: 0.8rem; }
}

.card h4 { margin-bottom: 0.5rem; color: #0066ff; }
body.dark .card { background: #1e1e1e; }

.test-credentials {
  background: #f0f8ff;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 3rem 0;
}
body.dark .test-credentials { background: #1a2a3a; }

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.greeting { font-size: 1rem; }
</file>

<file path="personal-information.html">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - Yuliia Plaksytska | QA Practice Site</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="container header-flex">
            <h1>Personal Information</h1>
            <div class="header-right">
                <span class="greeting">Welcome, <strong id="welcome-user">Guest</strong>!</span>
                <a href="login.html" id="logout-link" class="btn-small" style="display:none;">Logout</a>
                <button id="theme-toggle" aria-label="Toggle dark/light mode">Toggle Dark Mode</button>
            </div>
        </div>
    </header>
    
    <main class="container">
        <section class="hero">
            <h2>Yuliia Plaksytska</h2>
            <p>Paid Social Manager & QA Automation Enthusiast</p>
        </section>

        <div class="cards">
            <!-- Contact Card -->
            <div class="card">
                <h4>Contact Information</h4>
                <p><strong>Email:</strong> yuliiaplaksytska@gmail.com</p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yuliiaplaksytska" target="_blank">linkedin.com/in/yuliiaplaksytska</a></p>
                <p><strong>Address:</strong> Rotlintstraße 38, Frankfurt am Main, 60316, Germany</p>
                <p><strong>Languages:</strong> German, English, Ukrainian, Russian</p>
            </div>

            <!-- Experience Card -->
            <div class="card">
                <h4>Professional Experience</h4>
                <ul>
                    <li><strong>OMD Germany, Frankfurt</strong> (01/2025 - Present)<br>Executive Paid Social: Strategy development, A/B testing, reporting</li>
                    <li><strong>Sunlab, Aschaffenburg</strong> (03/2024 - 12/2024)<br>Performance Marketing Manager: Automated campaigns, Meta Ads Manager</li>
                    <li><strong>Reprise Digital, Frankfurt</strong> (12/2021 - 01/2024)<br>Junior Campaign Manager Paid Social: Planning, optimization, A/B tests</li>
                    <li><strong>Concentrix, Berlin</strong> (07/2020 - 11/2021)<br>Quality Evaluator: Meta/Instagram ad analysis, coaching</li>
                </ul>
            </div>

            <!-- Education Card -->
            <div class="card">
                <h4>Education</h4>
                <div style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 0.3rem;"><strong>Philipps-Universität Marburg</strong></p>
                    <p>North American Studies</p>
                    <p style="font-size: 0.9rem">Marburg, Germany</p>
                </div>
                <div>
                    <p style="margin-bottom: 0.3rem;"><strong>Taras Shevchenko National University</strong></p>
                    <p>English Translation</p>
                    <p style="font-size: 0.9rem">Kyiv, Ukraine</p>
                </div>
            </div>

            <!-- Skills Card -->
            <div class="card">
                <h4>Skills & Tools</h4>
                <p><strong>Marketing Tools:</strong> Meta Ads Manager, Sprinklr, Funnel.io, Supermetrics, Looker Studio</p>
                <p><strong>Technical:</strong> SQL, Jira, Notion</p>
            </div>

            <!-- Certifications Card -->
            <div class="card">
                <h4>Certifications</h4>
                <ul>
                    <li>Meta Certified Media Buying Professional (10/2023)</li>
                    <li>Meta Certified Media Planning Professional (11/2023)</li>
                    <li>Meta Certified Discovery Commerce Specialist (10/2023)</li>
                </ul>
            </div>

            <!-- Hobbies Card -->
            <div class="card">
                <h4>Hobbies & Interests</h4>
                <ul>
                    <li>Drum playing</li>
                    <li>The Odin Project (web development learning)</li>
                    <li>Road cycling</li>
                    <li>Jogging</li>
                </ul>
            </div>
        </div>
    </main>

    <script src="js/script.js"></script>
</body>
</html>
</file>

<file path="index.html">
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yuliia Plaksytska | QA Automation Practice</title>
    <link rel="stylesheet" href="css/style.css" /> <!-- Now matches the shared CSS -->
</head>

<body>
    <header>
        <div class="container header-flex">
            <h1>QA Automation Practice Site</h1>
            <div class="header-right">
                <span class="greeting">Welcome, <strong id="welcome-user">Guest</strong>!</span>
                <button id="theme-toggle" aria-label="Toggle dark/light mode">Dark Mode Toggle</button>
            </div>
        </div>
    </header>

    <main class="container">
        <section class="hero">
            <h2>Hi, I'm Yuliia Plaksytska</h2>
            <p>...and this is a <strong>static frontend-only</strong> website designed specifically for practicing Playwright automation
                testing.</p>
        </section>
        <section class="resume-section">
            <h3>About Me</h3>
            <div class="cards">
                <a href="personal-information.html" class="card">
                    <h4>Personal Resume</h4>
                    <p>Experience, skills, certifications, and contact details</p>
                </a>
            </div>
        </section>

        <section class="practice-links">
            <h3>Practice Pages</h3>
            <div class="cards">
                <a href="login.html" class="card">
                    <h4>Login Form</h4>
                    <p>Test valid/invalid credentials, form validation, alerts</p>
                </a>
                <a href="todo.html" class="card">
                    <h4>To-Do List</h4>
                    <p>Add, complete, delete tasks + summary counters + persistence</p>
                </a>
                <a href="nonexistent.html" class="card">
                    <h4>404 Error Page</h4>
                    <p>Trigger custom 404 page via broken link</p>
                </a>
                <a href="/page-does-not-exist.html" class="card" data-testid="broken-link-1">
                    <h4>🔗 Broken Link Test 1</h4>
                    <p>Intentionally broken link - triggers real 404 response</p>
                </a>
            </div>
        </section>
    </main>

    <script src="js/script.js"></script>
</body>

</html>
</file>

</files>
```

## File: todo.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>To-Do List | QA Practice Site</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container header-flex">
      <h1>QA Practice</h1>
      <div class="header-right">
        <span>Welcome, <strong id="welcome-user">Guest</strong>!</span>
        <a href="login.html" id="logout-link" class="btn-small">Logout</a>
        <button id="theme-toggle" aria-label="Toggle dark/light mode">🌙</button>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="todo-section">
      <h2>My To-Do List</h2>

      <div class="todo-add">
        <input type="text" id="new-todo" placeholder="Add a new task..." maxlength="100" required />
        <button id="add-todo-btn">Add Task</button>
      </div>
      <div id="todo-error" class="error-msg"></div>

      <ul id="todo-list">
        <!-- Items injected by JS -->
        <li class="todo-item" data-id="1">
          <input type="checkbox" id="todo-1" checked />
          <label for="todo-1">Practice Selenium WebDriver</label>
          <button class="delete-btn" aria-label="Delete task">×</button>
        </li>
        <li class="todo-item" data-id="2">
          <input type="checkbox" id="todo-2" />
          <label for="todo-2">Write Cypress tests</label>
          <button class="delete-btn" aria-label="Delete task">×</button>
        </li>
      </ul>

      <div class="todo-summary">
        <p>Total: <span id="total-tasks">2</span> | 
           Completed: <span id="completed-tasks">1</span> | 
           Remaining: <span id="remaining-tasks">1</span></p>
        <button id="clear-completed" class="btn-small">Clear Completed</button>
      </div>
    </section>
  </main>

  <script src="js/script.js"></script>
</body>
</html>
```

## File: nonexistent.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>404 - Page Not Found</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="error-page container">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <div class="btn-container">
      <a href="index.html" class="btn">Go Home</a>
      <a href="javascript:history.back()" class="btn-secondary">Go Back</a>
    </div>
  </div>
  <script src="js/script.js"></script>
</body>
</html>
```

## File: css/style.css
```css
/* Reset & Base */
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: system-ui, sans-serif; line-height: 1.6; transition: background 0.3s, color 0.3s; }
.container { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
header { background: #333; color: #fff; padding: 1rem 0; margin-bottom: 2rem; }
.header-flex { display: flex; justify-content: space-between; align-items: center; }
h1 { font-size: 1.8rem; }
button { cursor: pointer; }

/* Dark Mode */
body.dark { background: #121212; color: #e0e0e0; }
body.dark header { background: #1f1f1f; }
body.dark .login-card, body.dark .todo-section { background: #1e1e1e; }

/* Components */
.login-card, .todo-section {
  background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: .5rem; font-weight: 600; }
input[type=text], input[type=password] {
  width: 100%; padding: .8rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem;
}
button[type=submit], #add-todo-btn, .btn {
  background: #0066ff; color: white; border: none; padding: .8rem 1.2rem; border-radius: 6px; font-size: 1rem;
}
button[type=submit]:hover, #add-todo-btn:hover { background: #0050cc; }

.alert { padding: 1rem; border-radius: 6px; margin: 1rem 0; }
.alert.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.alert.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.hidden { display: none; }

.todo-add { display: flex; gap: 10px; margin-bottom: 1.5rem; }
#new-todo { flex: 1; padding: .8rem; font-size: 1rem; }
#todo-list { list-style: none; }
.todo-item {
  display: flex; align-items: center; padding: .8rem; background: #f9f9f9; margin-bottom: .5rem; border-radius: 6px;
}
.todo-item.completed label { text-decoration: line-through; opacity: 0.6; }
.delete-btn {
  margin-left: auto; background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 1.2rem;
}
.error-msg { color: #e74c3c; font-size: 0.9rem; min-height: 1.2em; display: block; }

.hero { text-align: center; margin: 3rem 0; }
.hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
.hero p { font-size: 1.2rem; color: #555; }
body.dark .hero p { color: #bbb; }

.practice-links h3 { margin: 3rem 0 1.5rem; text-align: center; }
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.card {
  background: #fff;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.error-page {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.error-page h1 {
  font-size: 8rem;
  color: #0066ff;
  margin-bottom: 1rem;
  font-weight: 300;
}
.error-page p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 500px;
  color: #666;
}
.btn-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.btn, .btn-secondary {
  display: inline-block;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
  min-width: 120px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.btn {
  background: #0066ff;
  color: white;
}
.btn:hover {
  background: #0050cc;
  transform: translateY(-2px);
}
.btn-secondary {
  background: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}
body.dark .error-page h1 { color: #4dabf7; }
body.dark .error-page p { color: #bbb; }
body.dark .btn-secondary { background: #495057; }
body.dark .btn-secondary:hover { background: #545b62; }
@media (max-width: 600px) {
  .btn-container { flex-direction: column; align-items: center; gap: 0.8rem; }
}

.card h4 { margin-bottom: 0.5rem; color: #0066ff; }
body.dark .card { background: #1e1e1e; }

.test-credentials {
  background: #f0f8ff;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 3rem 0;
}
body.dark .test-credentials { background: #1a2a3a; }

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.greeting { font-size: 1rem; }
```

## File: personal-information.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - Yuliia Plaksytska | QA Practice Site</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="container header-flex">
            <h1>Personal Information</h1>
            <div class="header-right">
                <span class="greeting">Welcome, <strong id="welcome-user">Guest</strong>!</span>
                <a href="login.html" id="logout-link" class="btn-small" style="display:none;">Logout</a>
                <button id="theme-toggle" aria-label="Toggle dark/light mode">Toggle Dark Mode</button>
            </div>
        </div>
    </header>
    
    <main class="container">
        <section class="hero">
            <h2>Yuliia Plaksytska</h2>
            <p>Paid Social Manager & QA Automation Enthusiast</p>
        </section>

        <div class="cards">
            <!-- Contact Card -->
            <div class="card">
                <h4>Contact Information</h4>
                <p><strong>Email:</strong> yuliiaplaksytska@gmail.com</p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yuliiaplaksytska" target="_blank">linkedin.com/in/yuliiaplaksytska</a></p>
                <p><strong>Address:</strong> Rotlintstraße 38, Frankfurt am Main, 60316, Germany</p>
                <p><strong>Languages:</strong> German, English, Ukrainian, Russian</p>
            </div>

            <!-- Experience Card -->
            <div class="card">
                <h4>Professional Experience</h4>
                <ul>
                    <li><strong>OMD Germany, Frankfurt</strong> (01/2025 - Present)<br>Executive Paid Social: Strategy development, A/B testing, reporting</li>
                    <li><strong>Sunlab, Aschaffenburg</strong> (03/2024 - 12/2024)<br>Performance Marketing Manager: Automated campaigns, Meta Ads Manager</li>
                    <li><strong>Reprise Digital, Frankfurt</strong> (12/2021 - 01/2024)<br>Junior Campaign Manager Paid Social: Planning, optimization, A/B tests</li>
                    <li><strong>Concentrix, Berlin</strong> (07/2020 - 11/2021)<br>Quality Evaluator: Meta/Instagram ad analysis, coaching</li>
                </ul>
            </div>

            <!-- Education Card -->
            <div class="card">
                <h4>Education</h4>
                <div style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 0.3rem;"><strong>Philipps-Universität Marburg</strong></p>
                    <p>North American Studies</p>
                    <p style="font-size: 0.9rem">Marburg, Germany</p>
                </div>
                <div>
                    <p style="margin-bottom: 0.3rem;"><strong>Taras Shevchenko National University</strong></p>
                    <p>English Translation</p>
                    <p style="font-size: 0.9rem">Kyiv, Ukraine</p>
                </div>
            </div>

            <!-- Skills Card -->
            <div class="card">
                <h4>Skills & Tools</h4>
                <p><strong>Marketing Tools:</strong> Meta Ads Manager, Sprinklr, Funnel.io, Supermetrics, Looker Studio</p>
                <p><strong>Technical:</strong> SQL, Jira, Notion</p>
            </div>

            <!-- Certifications Card -->
            <div class="card">
                <h4>Certifications</h4>
                <ul>
                    <li>Meta Certified Media Buying Professional (10/2023)</li>
                    <li>Meta Certified Media Planning Professional (11/2023)</li>
                    <li>Meta Certified Discovery Commerce Specialist (10/2023)</li>
                </ul>
            </div>

            <!-- Hobbies Card -->
            <div class="card">
                <h4>Hobbies & Interests</h4>
                <ul>
                    <li>Drum playing</li>
                    <li>The Odin Project (web development learning)</li>
                    <li>Road cycling</li>
                    <li>Jogging</li>
                </ul>
            </div>
        </div>
    </main>

    <script src="js/script.js"></script>
</body>
</html>
```

## File: index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yuliia Plaksytska | QA Automation Practice</title>
    <link rel="stylesheet" href="css/style.css" /> <!-- Now matches the shared CSS -->
</head>

<body>
    <header>
        <div class="container header-flex">
            <h1>QA Automation Practice Site</h1>
            <div class="header-right">
                <span class="greeting">Welcome, <strong id="welcome-user">Guest</strong>!</span>
                <button id="theme-toggle" aria-label="Toggle dark/light mode">Dark Mode Toggle</button>
            </div>
        </div>
    </header>

    <main class="container">
        <section class="hero">
            <h2>Hi, I'm Yuliia Plaksytska</h2>
            <p>...and this is a <strong>static frontend-only</strong> website designed specifically for practicing Playwright automation
                testing.</p>
        </section>
        <section class="resume-section">
            <h3>About Me</h3>
            <div class="cards">
                <a href="personal-information.html" class="card">
                    <h4>Personal Resume</h4>
                    <p>Experience, skills, certifications, and contact details</p>
                </a>
            </div>
        </section>

        <section class="practice-links">
            <h3>Practice Pages</h3>
            <div class="cards">
                <a href="login.html" class="card">
                    <h4>Login Form</h4>
                    <p>Test valid/invalid credentials, form validation, alerts</p>
                </a>
                <a href="todo.html" class="card">
                    <h4>To-Do List</h4>
                    <p>Add, complete, delete tasks + summary counters + persistence</p>
                </a>
                <a href="nonexistent.html" class="card">
                    <h4>404 Error Page</h4>
                    <p>Trigger custom 404 page via broken link</p>
                </a>
                <a href="/page-does-not-exist.html" class="card" data-testid="broken-link-1">
                    <h4>🔗 Broken Link Test 1</h4>
                    <p>Intentionally broken link - triggers real 404 response</p>
                </a>
            </div>
        </section>
    </main>

    <script src="js/script.js"></script>
</body>

</html>
```
