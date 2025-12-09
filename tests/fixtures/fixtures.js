import { test as base } from '@playwright/test';
import { PageManager } from '../pom-manager/PageManager.js';

export const test = base.extend({
  pageManager: async ({ page }, use) => {
    // Create PageManager instance before test
    const pageManager = new PageManager(page);
    
    // Use it in test
    await use(pageManager);
    
    // Cleanup after test (optional)
    // await page.close(); - Not needed as Playwright handles this
  },
  // In fixtures.js, add to your page manager
getIndexPage() {
  return new IndexPage(this.page);
}
});

export { expect } from '@playwright/test';