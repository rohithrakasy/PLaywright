const { test, chromium, expect } = require("@playwright/test");
const { LoginPageOrangeHrm } = require("../pageObjects/LoginPageOrangeHrm");
const { DashboardPage } = require("../pageObjects/DashboardPage");

test("Validate Orange HRM portal for POJ model Implementation", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginpage = new LoginPageOrangeHrm(page);
  const dashboardPage = new DashboardPage(page);
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  await loginpage.navigateToUrl(url);

  await page.waitForLoadState("domcontentloaded");

  await loginpage.validateHeader("Log");

  

  const fetchCredentials = await loginpage.getCredentials();

  console.log("UserName Credentials: " + fetchCredentials.userName);
  console.log("UserName Credentials: " + fetchCredentials.password);

  await loginpage.validateLoginPage(
    fetchCredentials.userName,
    fetchCredentials.password,
  );

  await dashboardPage.validateDashboardHeader("Dash");

  // await page.pause();
});
