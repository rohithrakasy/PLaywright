const {test,expect}= require('@playwright/test');


test('Rahul Assignment 1--> Print First content in Page', async ({page}) =>
{

    const userName=page.locator('#userEmail')
    const password = page.locator("[type='password']");
    const loginBtn= page.locator("[value*='Login']");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await userName.fill("rkrchintu@gmail.com");
    await password.fill("Test@1234");
    await loginBtn.click();

    const firstLabel= await page.locator(".card-body h5 b").nth(0).textContent();
    console.log(firstLabel);

    //Print all label Names

    const allLabels= await page.locator(".card-body h5 b").allTextContents();
    console.log(allLabels);

});

test.only('OPen Hyr Tutorials', async ({page}) =>
{

    await page.goto("https://www.hyrtutorials.com/");

    await page.waitForLoadState('networkidle');

    console.log(await page.title());
    // await expect(page).toHaveTitle("H Y R Tutorials - H Y R Tutorials");

    // await page.locator("#nav1 li").last().click();

    // console.log(await page.title());
    // await expect(page).toHaveTitle(/Contact/);

    //Fetch All contents

    const allHeaders=await page.locator(".theiaStickySidebar h3").allTextContents();

    console.log(allHeaders);


    
} );