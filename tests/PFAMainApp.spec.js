const { test, expect } = require("@playwright/test");

test.only("Test departments in Organization settings", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //Global Variables
  const name = "Rohith";

  page.goto("https://login");

  await page.setViewportSize({ width: 1280, height: 720 });

  //Wait until dom content is loaded
  await page.waitForLoadState("domcontentloaded");

  //Login with Credentials
  await page
    .getByPlaceholder("johndoe@email.com")
    .fill("rohithkumarrakasy@gmail.com");
  await page.locator("#password").fill("PFA@123");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("button", { name: "Quick Actions" }).waitFor();

  const heading = await page.locator(".text-2xl").textContent();
  console.log(heading);

  await expect(heading).toContain("Good");

  await page.locator(".lucide-chevron-down").click();
  //   await page.getByRole("link",{name:'Organization'}).click();
  await page.locator("[role*='menuitem']").nth(1).click();

  //Organization page
  await page.waitForLoadState("domcontentloaded");
  await page.getByRole("tab", { name: "Team" }).click();
  await page.getByRole("button", { name: "Departments" }).click();

  await page.pause();
});
