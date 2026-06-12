const excelJS = require("exceljs");

async function excelOperations() {
    let output ={
        row:-1,
        column:-1
    }
  const workbook = new excelJS.Workbook();

  await workbook.xlsx.readFile("C:/Users/rohit/Downloads/operations.xlsx");

  const worksheet = workbook.getWorksheet("Sheet1");
  worksheet.eachRow((row, rowNum) => {
    row.eachCell((cell, colNum) => {
      if (cell.value === "Spring") {
        console.log(output.row=rowNum);
        console.log(output.column=colNum);
      }
    });
  });

  const cell = worksheet.getCell(output.row, output.column);
  cell.value = 45;
  await workbook.xlsx.writeFile("C:/Users/rohit/Downloads/operations.xlsx");
}

excelOperations();
