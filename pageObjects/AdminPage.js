const { expect } = require("playwright/test");

class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminMenu = page.locator("//div[@class='oxd-topbar-body']/nav/ul/li/span");
    this.organizationMenu = page.locator("(//div[@class='oxd-topbar-body']/nav/ul/li/span)/../ul/li");
    this.generalInfoHeaderOrg = page.locator("h6.orangehrm-main-title");
  }

  async fetchAdminMenuContents() {
    await this.adminMenu.first().waitFor({state:"visible"});
    const menu = await this.adminMenu.allTextContents();
    return menu;
  }

  async hoverOnMenuItems(menuItem){
    await this.adminMenu.nth(menuItem).hover();
    await this.adminMenu.nth(menuItem).click();
  }

  async fetchOrganizationMenu(){
    await this.organizationMenu.first().waitFor({state:"visible"});
    const orgMenu=await this.organizationMenu.allTextContents();

    return orgMenu;

  }

  async hoverOnOrgItems(menuItem){
    await this.organizationMenu.nth(menuItem).hover();
    await this.organizationMenu.nth(menuItem).click();
  }

  async validateGeneralInfoDetails(header){
    await expect(this.generalInfoHeaderOrg).toContainText(header);
  }
}

module.exports ={AdminPage};
