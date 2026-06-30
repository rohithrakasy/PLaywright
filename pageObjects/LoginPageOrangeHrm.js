const { expect } = require("playwright/test");

class LoginPageOrangeHrm {
  constructor(page) {
    this.fetchusername = page.locator(
      "(//div[@class='orangehrm-login-form']/div/div/p)[1]",
    );
    this.fetchpassword = page.locator(
      "(//div[@class='orangehrm-login-form']/div/div/p)[2]",
    );

    this.setUserName = page.getByPlaceholder("Username");
    this.setPassword = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: " Login " });
    this.page = page;
    this.loginHeader = page.locator("h5");
  }

  async validateLoginPage(userName, password) {
    
    await this.setUserName.fill(userName);
    await this.setPassword.fill(password);
    await this.loginBtn.click();
  }

  async validateHeader(headerValue){
    await expect(this.loginHeader).toContainText(headerValue);
  }

  async getCredentials() {
    let fetchUserName = await this.fetchusername.textContent();

    const userName = fetchUserName.split(":")[1].trim();
    // console.log("UserName: " + userName);

    let fetchPassword = await this.fetchpassword.textContent();

    const password = fetchPassword.split(":")[1].trim();
    // console.log("Password: " + password);

    return { userName, password };
  }

  async navigateToUrl(url){
    await this.page.goto(url);
  }
}

module.exports = { LoginPageOrangeHrm };
