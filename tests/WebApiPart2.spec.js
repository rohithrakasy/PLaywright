const { test, request, expect } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");

const loginData = {
  userEmail: "rkrchintu@gmail.com",
  userPassword: "Test@1234",
};

const orderData = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

let response;

test.beforeAll(async () => {
  // const apiContext = await request.newContext();
  // const apiUtils = new ApiUtils(apiContext, loginData);
  // response = await apiUtils.createOrder(orderData);
});

test("Test Web Api", async ({ page }) => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginData);
  response = await apiUtils.createOrder(orderData);
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  // await page.waitForEvent("domcontentloaded");
  await page.locator(".table thead").first().waitFor();

  const fetchOderID = await page
    .locator(".table tbody th")
    .nth(0)
    .textContent();
  console.log("Fetch Order ID: " + fetchOderID);

  expect(response.orderID).toContain(fetchOderID);

  await page.pause();
});
