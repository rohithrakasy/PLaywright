const {LoginPageOrangeHrm}= require('./LoginPageOrangeHrm');
const {DashboardPage}= require('./DashboardPage');

class POManager {
  constructor(page) {
    this.page=page;
    this.loginpage = new LoginPageOrangeHrm(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  async getLoginpage(){
    return this.loginpage;
  }

  async getDashboardPage(){
    return this.dashboardPage;
  }
}

module.exports = {POManager};