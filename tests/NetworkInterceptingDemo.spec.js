const { test, request, expect } = require("@playwright/test");

let loginData = { userEmail: "rkrchintu@gmail.com", userPassword: "Test@1234" };

let orderData = {
  orders: [
    { country: "Germany", productOrderedId: "6960eae1c941646b7a8b3ed3" },
  ],
};

let token;

let response = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginData,
    },
  );

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  const userId = loginResponseJson.userId;
  const respMsg = loginResponseJson.message;

  console.log("Token: " + token);

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderData,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    },
  );

  const orderResponseJson = await orderResponse.json();
  response.orderId = orderResponseJson.orders[0];
  response.productId = orderResponseJson.productOrderId[0];

  console.log("Order ID: " + response.orderId);
  console.log("Product ID: " + response.productId);
});

test("Network Interception", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
  await page.waitForLoadState("domcontentloaded");

  await page.locator(".table  tbody th").nth(0).waitFor();

  const fetchOrder = await page
    .locator(".table  tbody th")
    .nth(0)
    .textContent();

  console.log("fetch order: " + fetchOrder);

  await expect(fetchOrder).toContain(response.orderId);
});
