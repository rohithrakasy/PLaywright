const { test, request } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState("domcontentloaded");

  await page.getByPlaceholder("email@example.com").fill("rkrchintu@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@1234");

  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");

  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
});

test(" Validate Session Stgorage state", async () => {
  const page = await webContext.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page
    .locator(".card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: " Add To Cart" })
    .click();
});

test(" Validate Session Stgorage state Second Test", async () => {
  const page = await webContext.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page
    .locator(".card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: " Add To Cart" })
    .click();
});

