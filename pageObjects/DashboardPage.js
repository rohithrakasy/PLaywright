const { expect } = require("playwright/test");

class DashboardPage{

    constructor(page){
        this.page =page;

        //locator for dashboard Heading
        this.dashboardHeader =page.locator("h6");
    }

    async validateDashboardHeader(value){
        await expect(this.dashboardHeader).toContainText(value);
    }
}

module.exports = {DashboardPage};