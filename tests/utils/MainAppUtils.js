class MainAppUtils {
  constructor(apiContext, loginData) {
    this.apiContext = apiContext;
    this.loginData = loginData;
  }

  async getToken() {
    let loginResponse = {};
    loginResponse.testData = await this.loginData;

    const response = await this.apiContext.post(
      "http://pfa-auth-alb-506540804.us-east-1.elb.amazonaws.com/apim/api/auth/userlogin",
      { data: loginResponse.testData },
    );

    const responseJson = await response.json();
    this.fetchToken = responseJson.token;
    this.fetchTenantID = responseJson.payload.user.tenant_id.id;
    this.fetchUserID = responseJson.payload.user.id;

    return this.fetchToken;
  }

  async createTask(taskData) {
    let response = {};
    response.token = await this.getToken();
    response.tenantId = await this.fetchTenantID;
    response.userId = await this.fetchUserID;
    //Create new task
    const taskResponse = await this.apiContext.post(
      "http://pfa-auth-alb-506540804.us-east-1.elb.amazonaws.com/apim/lead/api/tasks",
      {
        data: taskData,
        headers: {
          Authorization: `Bearer ${response.token}`,
          "X-Tenant-ID": response.tenantId,
          "X-User-ID": response.userId,
          "Content-Type": "application/json",
        },
      },
    );

    // await expect(taskResponse.ok).toBeTruthy();
    const taskResponseJson = await taskResponse.json();
    console.log(taskResponseJson);
    response.taskId = taskResponseJson.id;
    console.log("Task ID: " + response.taskId);

    return response;
  }
}

module.exports = { MainAppUtils };
