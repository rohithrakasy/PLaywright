// @ts-check

const isCI = !!process.env.CI;

const config = {
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000
  },

  use: {
    browserName: 'chromium',
    headless: isCI,
    screenshot: 'on',
    trace: 'on',

    viewport: isCI ? { width: 1280, height: 720 } : null,

    launchOptions: {
      args: isCI ? [] : ['--start-maximized']
    }
  },

  reporter: 'html'
};

module.exports = config;

