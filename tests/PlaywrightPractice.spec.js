const { test, chromium, expect } = require("@playwright/test");
const { link } = require("node:fs");

test("Validate Rahul SHetty Academy ", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  //Navigate to Practice page
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.waitForLoadState("domcontentloaded");

  const pageTitle = await page.title();
  console.log("Parent Page Title: " + pageTitle);

  await expect(page.locator("h1")).toHaveText("Practice Page");

  //Click radio button
  await page.locator("input[value='radio1']").check();

  //Select Country from search box
  let targetCountry = "Brazil";
  await page
    .getByPlaceholder("Type to Select Countries")
    .pressSequentially(targetCountry, { delay: 300 });

  const countDropdownVal = await page.locator("//ul[@id='ui-id-1']/li").count();
  console.log("Count Number of Values: " + countDropdownVal);

  await searchForCountry(page, countDropdownVal, targetCountry);

  //Select Option from the select Dropdown

  const dropdownVal = await page
    .locator("//select[@name='dropdown-class-example']")
    .selectOption({ value: "option2" });

  //select Checkbox

  /* fetch all Check boxes values and select from them */

  /* One way to fetch  all Options */

  // const checkBoxesOptions = await page.locator("//div[@id='checkbox-example']/fieldset/label").allTextContents();

  // console.log(checkBoxesOptions);

  /* Second Way */

  let checkBoxValues = [];

  const checkBoxescount = await page
    .locator("//div[@id='checkbox-example']/fieldset/label")
    .count();

  console.log(checkBoxescount);

  for (let i = 0; i < checkBoxescount; i++) {
    const values = await page
      .locator("//div[@id='checkbox-example']/fieldset/label/input")
      .nth(i)
      .getAttribute("value");

    checkBoxValues.push(values);
  }

  console.log(checkBoxValues[0]);

  /* Lets click on check boxes by passing array values */

  // const checkboxInput=await page.locator(`//input[@value='${checkBoxValues[0]}']`);

  // await checkboxInput.check();

  // await expect(checkboxInput).toBeChecked();

  //  await page.locator(`//div[@id='checkbox-example']/fieldset/label[contains(.,'${checkBoxValues[0]}')]/input`).check();

  /* Now lets select all options in checbox */

  for (let i = 0; i < checkBoxValues.length; i++) {
    await page.locator(`//input[@value='${checkBoxValues[i]}']`).check();
  }

  //Open a New page or New window

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("#openwindow").click(),
  ]);

  const getbtn = await newPage.getByRole("link", { name: "Get This Domain" });

  console.log(getbtn.textContent());

  await expect(getbtn).toBeVisible();

  await newPage.close();

  //Open a New Tab

  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("link", { name: "Open Tab" }).click(),
  ]);

  const newTabTitle = await newTab.url();

  console.log(newTabTitle);

  await page.bringToFront();

  await newTab.close();

  //Alert box
  await page.getByPlaceholder("Enter Your Name").fill(targetCountry);

  await expect(page.getByPlaceholder("Enter Your Name")).toHaveValue(
    targetCountry,
  );

  //click on Alert Btn
  await page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });
  await page.locator("input#alertbtn").click();

  // await page.pause();
});

async function searchForCountry(page, countDropdownVal, targetCountry) {
  for (let i = 0; i < countDropdownVal; i++) {
    const fetchVal = await page
      .locator("//ul[@id='ui-id-1']/li")
      .nth(i)
      .textContent();
    console.log(fetchVal);
    if (fetchVal === targetCountry) {
      await page.locator("//ul[@id='ui-id-1']/li").nth(i).click();
      break;
    }
  }
}
