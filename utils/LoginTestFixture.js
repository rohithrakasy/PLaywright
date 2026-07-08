const { test: base, expect } = require("@playwright/test");

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    await use(page);
  },
});

module.exports = { test, expect };
