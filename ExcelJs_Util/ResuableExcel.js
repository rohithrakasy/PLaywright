const excelJS = require("exceljs");

async function performExcelwriteOperations(filepath, targetVal,expectedVal) {
  const workbook = new excelJS.Workbook();
  await workbook.xlsx.readFile(filepath);

  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, targetVal);
  console.log("Row Number: " + output.row + " Column Number: " + output.column);

  const cellVal = worksheet.getCell(output.row, output.column+2);

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

performExcelwriteOperations(
  "C:/Users/rohit/Downloads/new.xlsx",
  "Apple",
  350
);
