const excelJS = require("exceljs");
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright-core");

async function writeExcel(filepath, targetVal, expectedVal, change) {
  const workbook = new excelJS.Workbook();
  await workbook.xlsx.readFile(filepath);

  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, targetVal);
  console.log("Row Number: " + output.row + " Column Number: " + output.column);

  const cellVal = worksheet.getCell(output.row, output.column + change.colVal);

  cellVal.value = expectedVal;

  await workbook.xlsx.writeFile(filepath);
}

async function readExcel(worksheet, targetVal) {
  let output = {
    row: -1,
    column: -1,
  };
  worksheet.eachRow((row, rowNum) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === targetVal) {
        output.row = rowNum;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// writeExcel(
//   "C:/Users/rohit/Downloads/test.xlsx",
//   "Apple",
//   350,
//   {rowVal:0,colVal:2}
// );

test("Validate Download and upload Excel ", async () => {
  const filePaths = "C:/Users/rohit/Downloads/download.xlsx";

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );

  await page.waitForLoadState("domcontentloaded");

  await expect(page.getByText("RAHUL SHETTY ACADEMY PRACTISE")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  await download.saveAs(filePaths); // saves to C:/Users/rohit/Downloads/download.xlsx

  await writeExcel(filePaths, "Apple", 550, { rowVal: 0, colVal: 2 });

  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(filePaths);

  await page.pause();
});
