import {test,expect} from '@playwright/test';

test('Perform All Testing scenarios in Hyr Tutorial Portal', async({page})=>{

    await page.goto("https://www.hyrtutorials.com/");

    await page.waitForLoadState('domcontentloaded');

    //Perform Dropdown Selection Select only one Value at a time

    const menuList =  await page.locator('#LinkList210 ul li a');
    menuList.filter({hasText:'Selenium Practice'}).hover();
    menuList.filter({hasText: 'Dropdowns'}).click();

    const htmlHeading = await page.getByRole('heading',{name: 'HTML Dropdowns'});
    await htmlHeading.waitFor({state: 'visible'});

    await expect(htmlHeading).toHaveText('HTML Dropdowns');

    await page.locator('select#course').selectOption('java');

    await page.locator('select#course').selectOption({label: 'Python'});

    //Select Multiple values at a time
    await page.locator('select#ide').selectOption([
        'ec','ij','vs','nb'
    ]);

    await page.locator('select#ide').selectOption({label: 'NetBeans'});

    await page.pause();

    await page.close();
})
