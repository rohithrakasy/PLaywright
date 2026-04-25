const { test, expect } = require("@playwright/test");
// const { use } = require('react');

test("First Playwright test", async ({ browser }) => {
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  await page.goto("https://github.com/login");
});

test("Second Test", async ({ page }) => {
  await page.goto("https://www.google.com/?zx=1775109696301");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Test Github Sign in page", async ({ page }) => {
  await page.goto("https://github.com/login");

  await expect(page).toHaveTitle("Sign in to GitHub · GitHub");

  await page.locator("[autocomplete='username']").fill("Sandeep");
  await page.locator("#password").fill("Test1234");
  await page.locator("[value='Sign in']").click();

  const errorVal = await page.locator(".js-flash-alert").textContent();
  console.log(errorVal);

  await expect(page.locator(".js-flash-alert")).toContainText(errorVal);
  console.log("Pass");
});

test(" Test rahul Shetty Practice page", async ({ page }) => {
  const userName = page.locator("[type='text']");
  const password = page.locator("#password");
  const terms = page.locator("#terms");
  const signInBtn = page.locator("[name='signin']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await console.log(await page.title());

  await userName.fill("rahul");
  await password.fill("test");
  await terms.click();
  await signInBtn.click();

  const errorMessage = await page.locator("[style*=block]").textContent();

  console.log(errorMessage);

  // if (errorMessage.match("Incorrect username/password.")) {
  //     console.log("Pass Test Case: "+ errorMessage);
  // }else{
  //     console.log("Fail Unable to retrieve error message");
  // }

  /* All the commented lines of code be replaced by single line of code in Playwright */

  await expect(page.locator("[style*=block]")).toContainText(errorMessage);
  console.log("Assertion Passed");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");

  await password.fill("");
  await password.fill("Learning@830$3mK2");

  const selectDropdown = await page.locator("select.form-control");

  await selectDropdown.selectOption("teach");

  const userBtn = await page.locator("label.customradio");

  await userBtn.nth(1).click();

  await page.locator("#okayBtn").click();

  //  await page.pause();

  console.log(await userBtn.last().isChecked());

  //Assertions
  await expect(userBtn.last()).toBeChecked();

  //Verify to check for blinking text by Validating attribute value
  const adds = page.locator("[href*=qa]");

  await expect(adds).toHaveAttribute("class", "blinkingText");

  // terms.click();
  //    await signInBtn.click();

  //    const firstCardVal=await page.locator(".card-body h4 a").first().textContent();
  //    console.log(firstCardVal);

  //    await expect(page.locator(".card-body h4 a").nth(0)).toContainText(firstCardVal);
  //    console.log("Pass: "+ firstCardVal);
});

test.only("Handling Child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await expect(page).toHaveTitle(/Login/);

  const add = page.getByRole("link",{name:'Free Access to InterviewQues/ResumeAssistance/Material'});

  /* We have a concept called promise (where promise return the status of line which returns pending, rejected and fulfilled)
         So, these two steps should perform at same stime because event listener should capture new page object
         so these are capture by Promise.all method and stored in the form of array.
    
    */

  const [newPage] = await Promise.all(
    [
      context.waitForEvent("page"), // Here in asynchronous this might skip due to still the new page is not opened
      add.click(),
    ], // it will open a new page --> So we need to go new page to perform operations]
  );

  const fetchText = await newPage
    .locator(".about_conference_heading")
    .textContent();
  console.log(fetchText);
  // await newPage.close();
  // await page.pause;

  const fetchNameFromPara = newPage.locator("[style*='font-size:0.92rem']");

  const fetchTextOfName = await fetchNameFromPara.last().textContent();
  console.log(fetchTextOfName);

  const arrayFromPara = await fetchTextOfName.trim().split(" ");
  console.log(arrayFromPara[0]);
  console.log(arrayFromPara[1]);

  await page.pause();
  const fullName = arrayFromPara[0] + arrayFromPara[1];
  await page.locator("input#username").fill(fullName);

  console.log(await page.locator("input#username").inputValue());
});

test("Practice With advance locators", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.waitForLoadState("domcontentloaded");

  await page.getByPlaceholder("email@example.com").fill("rkrchintu@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@1234");

  await page.locator("#login").click();

  await page.waitForLoadState("domcontentloaded");
  //await page.locator(".card-body").waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.waitForLoadState("domcontentloaded");

  await expect(page.getByText("My Cart")).toBeVisible();

  await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  //enter card details
  await page.locator("[type='text']").nth(1).fill("123");
  await page.locator("[type='text']").nth(2).fill("Rohith");

  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button", { name: "India" }).nth(1).click();

  await page.getByText("Place Order ").click();

  await page.waitForLoadState("domcontentloaded");

  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


  

});

//Handle Calendars

test('How To handle calendars', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const month="6";
    const day = "15";
    const year = "2028";

    await page.waitForLoadState("domcontentloaded");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();

    //Click year
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    const dateValue=await page.locator(".react-date-picker__inputGroup input").nth(0).getAttribute("value");
    console.log(dateValue);

    const dateArr=dateValue.split("-");

    for(let i=0;i<dateArr.length;++i){
        console.log(dateArr[i]);
    }


})
