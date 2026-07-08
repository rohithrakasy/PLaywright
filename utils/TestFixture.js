const {test:base, expect} =require('@playwright/test');

const test= base.extend({
    testDataOrange: async({},use)=>{
        await use({
            username: "Admin",
            password: "admin123"
        })
        
    },
    loginPage: async ({ page }, use) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    await use(page);
  }

});

module.exports ={test,expect};