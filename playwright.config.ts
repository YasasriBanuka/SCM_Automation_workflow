import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'https://sc-web-dev.innov8hrm.com/',
    headless: false,

    // Browser window size follows actual browser window
    viewport: null,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  timeout: 60000,

  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',

        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});