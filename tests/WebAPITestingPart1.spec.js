const {test,request, expect}=require('@playwright/test');
const {ApiUtils} =require('./utils/ApiUtils');

const loginRequestData = {userEmail:"rkrchintu@gmail.com",userPassword:"Test@1234"}; // property

let response;
let orderData;

test.beforeAll(async ()=>{

    const apiContext=await request.newContext();
    const apiUtil=new ApiUtils(apiContext,loginRequestData);
    response = apiUtil.createOrder(orderData);
    response.token =apiUtil.gettoken();
});

test("API Testing using playwright", async ({browser}) =>{


    const context= await browser.newContext();
    const page= await context.newPage();

    // Add token in this context to skip login

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    // await page.waitForEvent("domcontentloaded");
    await page.locator(".card-body").first().waitFor();

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: ' Add To Cart'}).click();


    await page.pause();
    
    

    
})
