## README

### Test Count & Coverage

The test suite consists of **7 test modules** with **50+ individual tests** organized by feature:

| Module | Tests | Coverage |
|--------|-------|----------|
| `login.spec.js` | 5 | Login form validation, credentials, alerts, redirects |
| `todo.spec.js` | 8 | Add/delete/complete tasks, counters, max-length validation |
| `theme.spec.js` | 3 | Dark/light mode toggle on index, login, todo pages |
| `navigation.spec.js` | 5 | Route navigation, 404 handling, URL verification |
| `selectors.spec.js` | 6 | ID/class/attribute selector practice |
| `assertions.spec.js` | 7 | Visibility, attributes, state changes, text matching |
| `end-to-end.spec.js` | 4 | Multi-page user flows (login → todo → logout) |

### Coverage Areas

The tests cover the following areas of the QA practice site:​

- Authentication & login: valid and invalid credentials, login alert behavior, redirect to todo.html.​

- Todo list functionality: adding tasks (valid/empty/max length), marking tasks as completed, deleting tasks, clearing completed tasks, and verifying summary counters (total, completed, remaining).​

- Theme toggle: verifying the #theme-toggle button on all main pages and checking that the dark class is applied to <body> when toggled.​

- Navigation & routing: navigating from home to login, todo, and personal info pages, and handling nonexistent pages / 404 cases.​

- Selectors & locators: finding forms, inputs, todo items, delete buttons, and theme toggles by ID, class, and attribute selectors.​

The site itself lives in the project root as static files (index.html, login.html, todo.html, personal-information.html, nonexistent.html), with JavaScript in js/script.js and styling in css/style.css

### How to Run Locally

**Prerequisites:**
- Node.js 20+ 
- npm

**Setup:**
Clone repository:
 - git clone https://github.com/walkingmaze/walkingmaze.git
 - cd walkingmaze

Install dependencies:
 - npm ci

Install Playwright browsers:
 - npx playwright install

**Run Tests:**
Headless mode (fast)
 - npx playwright test

Headed mode (see browser)
 - npx playwright test --headed

Debug mode (step-through)
 - npx playwright test --debug

Run single file
 - npx playwright test tests/specs/todo.spec.js

**HTML Report:**
Generated automatically after test run:
npx playwright show-report

Opens interactive report with:
- Pass/fail breakdown
- Screenshots & videos
- Step-by-step execution logs
- Trace files for debugging

**Project Structure:**

The Playwright configuration lives in tests/playwright.config.js, and the Node/Playwright dependencies for the tests are defined in tests/package.json. The tests use a shared PageManager (tests/pom-manager/PageManager.js) and fixtures (tests/fixtures/fixtures.js) to expose typed page objects (IndexPage, LoginPage, TodoPage, PersonalInfoPage).

## Project Structure

## Project Structure

### Root Files
| File | Description |
|------|-------------|
| `README.md` | Main project documentation |
| `.nojekyll` | Disable Jekyll for GitHub Pages |
| `.gitignore` | Git ignore rules |

### QA Practice Site (Static HTML/JS App)
| File/Folder | Description |
|-------------|-------------|
| `index.html` | Home page |
| `login.html` | Login page |
| `todo.html` | Todo list page |
| `personal-information.html` | Personal info page |
| `nonexistent.html` | 404 test page |
| `js/script.js` | App logic (auth, todos, theme) |
| `css/style.css` | App styling |

### Playwright Test Suite
| Folder/File | Description |
|-------------|-------------|
| `tests/specs/` | Test files |
| `tests/pages/` | Page Object Model |
| `tests/fixtures/fixtures.js` | PageManager, test fixtures |
| `tests/utils/` | Test data & helpers |
| `tests/playwright.config.js` | Playwright configuration |
| `tests/package.json` | Test dependencies |
| `tests/playwright-report/` | Generated HTML reports (gitignored) |

### CI/CD
| File | Description |
|------|-------------|
| `.github/workflows/test.yml` | Playwright test runner |
| `.github/workflows/pages.yml` | GitHub Pages deployment |

### Directory Breakdown

| Directory | Purpose |
|-----------|---------|
| `tests/specs/` | Test files (login, todo, navigation, etc.) |
| `tests/pages/` | Page objects for each page (POM pattern) |
| `tests/fixtures/` | Shared test setup & PageManager |
| `tests/utils/` | Selectors, test data, helper functions |
| `.github/workflows/` | GitHub Actions CI/CD |
| `js/` | App JavaScript (not tests) |
| `css/` | App styling (not tests) |


**CI Pipeline:**
GitHub Actions is configured in .github/workflows/test.yml to run the full Playwright suite on every push and pull request to main on an ubuntu-latest runner. This ensures tests are executed consistently in CI as well as locally.
- Runs on every `push` and `pull_request` to `main`
- Executes on `ubuntu-latest` GitHub Actions runner
- Full test suite + HTML report artifact
- View live runs: [GitHub Actions] https://github.com/walkingmaze/walkingmaze/actions


### Results & Screenshots
- **Status**: All tests passing 
- **Report**: Generated at `tests/playwright-report/` (HTML with screenshots/videos)
- **Multi-browser**: Chromium, Firefox, WebKit (configured in `playwright.config.js`)

### Tech Stack

- **Test Framework**: Playwright 1.48+
- **Language**: JavaScript (ES6+)
- **Architecture**: Page Object Model (POM)
- **CI/CD**: GitHub Actions
- **Reporting**: Playwright HTML Reporter

## What I Learned

### How POM Improved Test Maintainability

The **Page Object Model** pattern significantly improved code organization and maintainability:

- **Centralized locators**: All selectors for a page live in one class (`LoginPage.js`, `TodoPage.js`, etc.)
- **Single point of change**: When a selector changes (e.g., button ID), update only the page object—no test files need modification
- **Readable test code**: Tests read like user stories (`await loginPage.login(username, password)`) instead of raw Playwright commands
- **Reduced duplication**: Common flows (login, add task, navigate) are methods reused across all tests

**Example:**
// Before POM: Duplicated selectors in every test
await page.fill('#username', 'admin');
await page.fill('#password', 'password123');
await page.click('#login-btn');

// After POM: Reusable, readable, maintainable
await loginPage.login('admin', 'password123');

###  DRY vs KISS Principles

**DRY (Don't Repeat Yourself):**
- Common user flows (`login()`, `addTask()`, `checkTodoByIndex()`) are methods in page objects
- Test data (credentials, selectors) live in `testData.js`, shared across all specs
- Setup logic in `fixtures.js` eliminates repetitive test initialization

**KISS (Keep It Simple, Stupid):**
- Each test focuses on **one behavior** (login fails with wrong password, todo updates on completion)
- Page objects contain **UI interaction logic only**—no assertions or business logic inside them
- Tests remain short, readable, and maintainable without over-engineering

**Result:** Balanced approach—shared utilities reduce duplication while tests stay simple and focused.

### Why Fixtures Matter

Playwright fixtures (`tests/fixtures/fixtures.js`) provided a **centralized test setup**:

- **PageManager injection**: All tests receive a pre-configured `pageManager` that exposes page objects
- **Single source of truth**: Base URL, timeouts, and test data configuration in one place
- **Easy updates**: Change base URL or add test data globally without modifying test files
- **Reduced boilerplate**: No repetitive page initialization in every test

**Impact:**
- Migrating from local testing to CI required only updating `fixtures.js`, not 50+ test files
- Adding a new page object (e.g., `PersonalInfoPage`) automatically available to all tests

###  Key Takeaways

| Concept | Benefit |
|---------|---------|
| **POM** | Maintainability, readability, reduced duplication |
| **DRY** | Shared utilities, single sources of truth |
| **KISS** | Simple, focused tests that are easy to debug |
| **Fixtures** | Centralized setup, easy configuration changes |
| **Multi-browser** | Comprehensive coverage, early bug detection |

---
