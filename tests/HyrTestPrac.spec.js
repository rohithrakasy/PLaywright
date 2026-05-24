const {test, expect}=require('@playwright/test');

test('First Test', async({page})=>{

    await page.goto("https://www.hyrtutorials.com/");

    await page.waitForLoadState('domcontentloaded');

    await page.locator("#Header1_headerimg").waitFor();

    await page.locator("#menu ul li").filter({hasText:'Selenium Practice'}).hover();
    await page.locator("#menu ul li a").filter({hasText: 'Dropdowns'}).click();

    const title=await page.locator(".entry-title").textContent();
    console.log("Title: "+ title);
    await expect(page.locator(".entry-title")).toContainText("Dropdowns");
    
    await page.locator("#course").selectOption("java");

    const selectedVal=await page.locator("#course").inputValue();
    console.log("Dropdown Value: "+ selectedVal);

    await page.pause();
})