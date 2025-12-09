import { LoginPage } from '../pages/LoginPage.js';
import { TodoPage } from '../pages/TodoPage.js';
import { IndexPage } from '../pages/IndexPage.js';
import { PersonalInfoPage } from '../pages/PersonalInfoPage.js';

export class PageManager {
  constructor(page) {
    this.page = page;
    
    // Initialize all pages
    this.loginPage = new LoginPage(page);
    this.todoPage = new TodoPage(page);
    this.indexPage = new IndexPage(page);
    this.personalInfoPage = new PersonalInfoPage(page);
  }

  // Getters for easy access
  getLoginPage() {
    return this.loginPage;
  }

  getTodoPage() {
    return this.todoPage;
  }

  getIndexPage() {
    return this.indexPage;
  }

  getPersonalInfoPage() {
    return this.personalInfoPage;
  }
}