const {test,expect}= require('@playwright/test');
const { log } = require('node:console');

test('Login as Admin in Main APP', async ({page}) =>
{

    const login= page.locator("[type='email']");
    const password= page.locator("[type='password']");
    const signInBtn= page.locator("[type='submit']");

   await page.goto("https://dev.suretyforce.com/login");

   console.log(await page.title());

   await expect(page).toHaveTitle(/SF/);

   await login.fill("rohith@coreaiconsulting.com");
   await password.fill("test1234");
   await signInBtn.click();

    const allElements=page.locator(".pt-4 div a");
 //  await page.locator(".pt-4 div a").last().waitFor();

   console.log(await allElements.last().textContent());

   console.log(await allElements.allTextContents());

   await allElements.last().click();


});