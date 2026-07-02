const { test, chromium, expect, firefox } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

// convert JSON --> String --> Js object
const testData = JSON.parse(JSON.stringify(require("../utils/OrangehrmPOJTestData.json")));


test("Validate Orange HRM portal for POJ model Implementation", async () => {
  // const browser = await chromium.launch({ headless: false });
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginpage =await  poManager.getLoginpage();
  const dashboardPage =await poManager.getDashboardPage();
  const adminPage= await poManager.getAdminPage();
  
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  await loginpage.navigateToUrl(url);

  await page.waitForLoadState("domcontentloaded");

  await loginpage.validateHeader("Log");

  

  const fetchCredentials = await loginpage.getCredentials();

  console.log("UserName Credentials: " + fetchCredentials.userName);
  console.log("UserName Credentials: " + fetchCredentials.password);

  // await loginpage.validateLoginPage(
  //   fetchCredentials.userName,
  //   fetchCredentials.password,
  // );

  await loginpage.validateLoginPage(
    testData.usernamef,
    testData.password
  );

  await dashboardPage.validateDashboardHeader("Dash");

  const menuList= await dashboardPage.getDashboardMenu();
  console.log(menuList);

  //Click on Admin to Navigate inside

  await dashboardPage.adminModule();

  //fetch all menu contents from Admin module
  const values= await adminPage.fetchAdminMenuContents();
  console.log("Admin: "+ values);

  await adminPage.hoverOnMenuItems(2);

  const orgMenuVal=await adminPage.fetchOrganizationMenu();
  console.log("Organization: "+ orgMenuVal);

  await adminPage.hoverOnOrgItems(0);

  await adminPage.validateGeneralInfoDetails("General Information");

  await page.pause();


});
