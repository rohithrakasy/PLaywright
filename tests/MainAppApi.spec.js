const { test, request, expect } = require("@playwright/test");

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

let fetchToken;
let taskId;
let fetchTenantID;
let fetchUserID;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    "http://pfa-auth-alb-506540804.us-east-1.elb.amazonaws.com/apim/api/auth/userlogin",
    { data: testData },
  );

  await expect(response.ok).toBeTruthy();
  const responseJson = await response.json();
  fetchToken = responseJson.token;
  fetchTenantID = responseJson.payload.user.tenant_id.id;
  fetchUserID = responseJson.payload.user.id;
  console.log("Token: " + fetchToken);
  console.log("Tenant ID: " + fetchTenantID);
  console.log("User ID: " + fetchUserID);

  //Create new task
  const taskResponse = await apiContext.post(
    "http://pfa-auth-alb-506540804.us-east-1.elb.amazonaws.com/apim/lead/api/tasks",
    {
      data: taskData,
      headers: {
        Authorization: `Bearer ${fetchToken}`,
        "X-Tenant-ID": fetchTenantID,
        "X-User-ID": fetchUserID,
        "Content-Type": "application/json",
      },
    },
  );

  await expect(taskResponse.ok).toBeTruthy();
  const taskResponseJson = await taskResponse.json();
  console.log(taskResponseJson);
  taskId = taskResponseJson.id;
  console.log("Task ID: " + taskId);
});

test("Main App Api Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript((value) => {
    window.localStorage.setItem("auth_token", value);
  }, fetchToken);

  await page.goto("https://dev.suretyforce.com/dashboard/tasks");

  await page.pause();
});
