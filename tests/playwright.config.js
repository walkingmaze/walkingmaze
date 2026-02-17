import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './specs',
  
  // Global timeout for each test (10 seconds)
  timeout: 10 * 1000,
  
  // Expect timeout for assertions (5 seconds)
  expect: {
    timeout: 5000,
  },
  
  // Fail on console errors
  fullyParallel: true,
  
  // Retry failed tests once
  retries: 0,
  
  workers: 1,
  
  // Reporter configuration
  reporter: [
    ['html'],           // Generates HTML report
    ['junit'],          // For CI/CD integration
    ['list'],           // Console output
  ],
  
  // Global setup
  use: {
    // Base URL for your website
    baseURL: 'https://walkingmaze.github.io/playwright-qa-practice-site/',
    
    // Enable tracing for failed tests
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
  },
  
  // Project configuration (browsers to test on)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
/*       {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      }, */
  ],
  
  // Web server (optional, if hosting locally)
 /*  webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  }, */
});