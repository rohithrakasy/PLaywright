// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';



const config = {
  testDir: './tests',

  timeout: 30 * 1000,  // Global timeout

  expect: {
    timeout: 5 * 1000  // Assertion timeout
  },

  use: {
    browserName: 'firefox',
    headless: false,
    screenshot: 'on',
    // trace: 'on', // It will add trace for all failed and Passed test cases
    trace:'reatain-on-failure',


    viewport: null,   // ✅ ADD THIS (maximize)

    launchOptions: {
      args: ['--start-maximized']  // ✅ optional but recommended
    }
  },

  reporter: 'html'
};

module.exports = config;

