import {test,expect} from '@playwright/test';

test('Perform All Testing scenarios in Hyr Tutorial Portal', async({page})=>{

    await page.goto("https://www.hyrtutorials.com/");

    await page.waitForLoadState('domcontentloaded');

    const menuList =  await page.locator('#LinkList210 ul li a');
    menuList.filter({hasText:'Selenium Practice'}).hover();
    menuList.filter({hasText: 'Dropdowns'}).click();

    await expect(page.getByRole('heading',{name: 'HTML Dropdowns'})).toHaveText('HTML Dropdowns');

    await page.pause();

    await page.close();
})
