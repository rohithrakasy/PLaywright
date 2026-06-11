const {test, expect} = require('@playwright/test');

test('Screenshot practice Test', async({browser})=>{

    const context= await browser.newContext();
    const page = await context.newPage();

    //Navigate to Practice page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForLoadState('domcontentloaded');

    // const Header=await page.locator('h1').textContent();
    // console.log(Header);

    await expect(page.locator('h1')).toHaveText('Practice Page');

    //Click radio button
    await page.locator("input[value='radio1']").check();

    await page.getByPlaceholder("Type to Select Countries").pressSequentially("india",{delay:300});
    
    const countDropdownVal=await page.locator("ul#ui-id-1 li").count();
    await page.screenshot({path: 'dropdownValues.png'});
    console.log("Count Number of Values: "+ countDropdownVal);

    for(let i=0;i<countDropdownVal;i++){
        const fetchVal=await page.locator("ul#ui-id-1 li").nth(i).textContent();
        console.log(fetchVal);
        if(fetchVal==='India'){
            await page.locator("ul#ui-id-1 li").nth(i).click();
            break;
        }
    }

    await page.locator("#show-textbox").click();
    await page.getByPlaceholder("Hide/Show Example").isVisible();
    await page.getByPlaceholder("Hide/Show Example").screenshot({path:'partial.png'});

    await page.locator("#hide-textbox").click();
    if(!await page.getByPlaceholder("Hide/Show Example").isVisible()){
        console.log("Pass")
        await page.screenshot({path: 'disabled.png'});
    }
    

    // await page.pause();



});

test.only("Visual Testing",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com/");
    
    expect(await page.screenshot()).toMatchSnapshot('google.png');
})