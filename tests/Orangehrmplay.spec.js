import {test} from '@playwright/test';
import SplitFunction from '../utils/SplitFunction';

test('Test Orange hrm Application with playwright', async ({page})=>{

    const splittext = new SplitFunction();

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    let fethRawUserName =await page.locator('div.oxd-sheet p').nth(0).textContent();
    let fetchRawPassword = await page.locator('div.oxd-sheet p').nth(1).textContent();

    console.log(fethRawUserName);
    console.log(fetchRawPassword);

    let username = splittext.splitText(fethRawUserName);
    let password = splittext.splitText(fetchRawPassword);
    console.log('Fetch Split Username: ', username[1].trim());

    console.log('Fetch Split Password: ', password[1].trim());

    

    await page.getByPlaceholder('Username').fill(username[1].trim());
    await page.getByPlaceholder("Password").fill(password[1].trim());

    await page.getByRole('button',{name:'Login'}).click();

    await page.waitForLoadState('domcontentloaded');

    const menu = await page.locator('ul.oxd-main-menu li a span');

    await menu.first().waitFor({state:'visible'}); // wait for visbile until first element

    const fetchMenuDetails = await menu.allTextContents();
    console.log(fetchMenuDetails);
    console.log("Length of the array: "+fetchMenuDetails.length);

    await menu.nth(0).click();

    //Fill Admin Details for searching an employee
    /*User Name */
    await page.locator('.oxd-input-group').filter({hasText:'Username'}).locator('input.oxd-input').fill('admin');

    // Select User Role
    await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();

    await page.locator("div[role='listbox']").click();

    await page.getByRole('button',{name:'Search'}).click();

    //Now fetch all contents from record
    const fetchAdminRecords= await page.locator('.oxd-table-cell div');

    await fetchAdminRecords.first().waitFor({state:'visible'});

    const record = await fetchAdminRecords.allTextContents();


    console.log(record);
    







    await page.pause();

    await page.close();

}
)