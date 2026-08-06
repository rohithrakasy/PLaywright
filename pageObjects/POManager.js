const {LoginPageOrangeHrm}= require('./LoginPageOrangeHrm');
const {DashboardPage}= require('./DashboardPage');
const {AdminPage}=require('./AdminPage');

class POManager {
  constructor(page) {
    this.page=page;
    this.loginpage = new LoginPageOrangeHrm(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.adminPage = new AdminPage(this.page);
  }

  async getLoginpage(){
    return this.loginpage;
  }

  async getDashboardPage(){
    return this.dashboardPage;
  }

  async getAdminPage(){
    return this.adminPage;
  }
}

module.exports = {POManager};