const { test, expect } = require("@playwright/test");

test("End 2 End Script", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //User Input
  const productName = await "ZARA COAT 3";

  //Global Variables
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");

  const products = page.locator(".card-body");
  const productTitle = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await email.fill("rkrchintu@gmail.com");
  const fetchEmailInput = await email.inputValue();

  console.log(fetchEmailInput);

  await password.fill("Test@1234");

  await loginBtn.click();

  await productTitle.nth(0).waitFor();
  await page.waitForLoadState("networkidle");
  const firstProductTitle = await productTitle.nth(1).textContent();

  console.log(firstProductTitle);

  const countOfProducts = await products.count();
//   await page.pause();
  for (let i = 0; i < countOfProducts; ++i) {
    if ((await products.nth(i).locator("b").textContent()).trim() === productName) {
      //   await page.pause();
      await products.nth(i).locator("button:has-text('Add To Cart')").click();
      break;
    }
  }

  await page.locator("[style='margin-top: -10px;']").nth(1).click();
  
  const myCart=page.locator(".cart li");
  await myCart.waitFor();
  // const booleanVal=await page.locator(".cartSection h3").isVisible();
  const booleanVal=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(booleanVal).toBeTruthy();

  //click on checkout
  await page.locator("button:has-text('Checkout')").click();
  await page.locator("text=Place Order ").waitFor();

  //Cvv Code
  await page.locator("input[type='text']").nth(1).fill("234");
  await page.locator("input[type='text']").nth(2).fill("RKR");
  await page.locator("input[type='text']").nth(3).fill("fgtre");

  

  await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  await page.locator(".list-group").waitFor();

  const dropdownCount=await page.locator(".list-group button").count();

  for(let i=0; i< dropdownCount;++i){

    const dropdownVal=await page.locator(".list-group span").nth(i).textContent();
    console.log(dropdownVal);
    if(dropdownVal.trim()==="India"){
      await page.locator(".list-group span").nth(i).click();
      break;
    }
  }

  //validate email id
  await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText("rkrchintu@gmail.com");

  await page.locator("text=Place Order ").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId=await page.locator("label.ng-star-inserted").textContent();
  console.log(orderId);

  const arr1=orderId.split();
  console.log(arr1[0]);
  


  await page.pause();
});
