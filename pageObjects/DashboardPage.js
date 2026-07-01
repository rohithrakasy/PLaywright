const { expect } = require("playwright/test");

class DashboardPage{

    constructor(page){
        this.page =page;

        //locator for dashboard Heading
        this.dashboardHeader =page.locator("h6");

        this.fetchmenu = page.locator("div.oxd-sidepanel-body ul li a span");
    }

    async validateDashboardHeader(value){
        await expect(this.dashboardHeader).toContainText(value);
    }

    async getDashboardMenu(){
        await this.fetchmenu.first().waitFor({state:"visible"});
        return this.fetchmenu.allTextContents();
    }


}

module.exports = {DashboardPage};