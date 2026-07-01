const { test, chromium, expect, firefox } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");


test("Validate Orange HRM portal for POJ model Implementation", async () => {
  // const browser = await chromium.launch({ headless: false });
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginpage =await  poManager.getLoginpage();
  const dashboardPage =await poManager.getDashboardPage();
  
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

  const menuList= await dashboardPage.getDashboardMenu();
  console.log(menuList);

});
