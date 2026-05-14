class ApiUtils {
  constructor(apiContext, loginData) {
    this.apiContext = apiContext;
    this.loginData = loginData;
  }

  async gettoken() {
    // Auth token - Login token
    const loginRequestResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginData,
      },
    );

    // await expect(loginRequestResponse.ok()).toBeTruthy();
    const loginRequestResponseJson = await loginRequestResponse.json();
    const token = loginRequestResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderData) {
    // Create Order -- API

    let response = {};
    response.token = await this.gettoken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderData,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );

    const orderResponseJson = await orderResponse.json();
    const orderID = orderResponseJson.orders[0];
    console.log("Order ID: " + orderID);
    console.log("Product Id: " + orderResponseJson.productOrderId[0]);
    console.log("Message: " + orderResponseJson.message);
    response.orderID = orderID;
    return response;
  }
}

module.exports = { ApiUtils };
