const { test, request, expect } = require("@playwright/test");
const { MainAppUtils } = require("./utils/MainAppUtils");

let testData = {
  email: "rohithkumarrakasy@gmail.com",
  password: "test1234",
  device_id: "PFA-device-540",
};

let taskData = {
  title: "Test New Task_04",
  priority: "MEDIUM",
  company_id: "54b009e7-bdfe-4293-adbb-43feeed1f193",
  referenceType: "COMPANY",
  reference_id: "54b009e7-bdfe-4293-adbb-43feeed1f193",
};

let taskResponse = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const mainUtils = new MainAppUtils(apiContext, testData);
  taskResponse = await mainUtils.createTask(taskData);
});

test("Main App Api Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript((value) => {
    window.localStorage.setItem("auth_token", value);
  }, taskResponse.token);

  await page.goto("https://dev.suretyforce.com/dashboard/tasks");

  await page.pause();
});
