const { test, request, expect } = require("@playwright/test");

const loginData = {
  userEmail: "rkrchintu@gmail.com",
  userPassword: "Test@1234",
};

const orderData = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

let token;
let orderID;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // Auth token - Login token
  const loginRequestResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginData,
    },
  );

  await expect(loginRequestResponse.ok()).toBeTruthy();
  const loginRequestResponseJson = await loginRequestResponse.json();
  token = loginRequestResponseJson.token;
  console.log(token);

  // Create Order -- API

  const orderResponse=await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderData,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    },
  );

  await expect(orderResponse.ok()).toBeTruthy();
  const orderResponseJson= await orderResponse.json();
  orderID = orderResponseJson.orders[0];
  console.log("Order ID: "+ orderID);
  console.log("Product Id: "+ orderResponseJson.productOrderId[0]);
  console.log("Message: "+ orderResponseJson.message);
});

test("Test Web Api", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  // await page.waitForEvent("domcontentloaded");
  await page.locator(".table thead").first().waitFor();

  const fetchOderID=await page.locator(".table tbody th").nth(0).textContent();
  console.log("Fetch Order ID: "+fetchOderID);

  expect(orderID).toContain(fetchOderID);

  await page.pause();
});
