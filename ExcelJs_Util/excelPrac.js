const excelJs = require("exceljs");

// async function excelTest() {
//   const workbook = new excelJs.Workbook();
//   await workbook.xlsx.readFile(
//     "C:/Users/rohit/Downloads/excel_download_test.xlsx",
//   );
//   const worksheet = await workbook.getWorksheet("Sheet1");

//   worksheet.eachRow((row, rowNumber) => {
//     row.eachCell((cell, colNumber) => {
//       console.log(cell.value);
//     });
//   });
// }

// excelTest();

// /* Find particular value in excel */

// async function writeUpdateExcel() {

//     const workbook = new excelJs.Workbook();
//     await workbook.xlsx.readFile("C:/Users/rohit/Downloads/excel_download_test.xlsx");
//     const worksheet = workbook.getWorksheet("Sheet1");
//     worksheet.eachRow((row,rowNumber)=>{
//         row.eachCell((cell,colNumber)=>{
//             if(cell.value=== 'Kivi'){
//                 console.log(rowNumber);
//                 console.log(colNumber);
//             }
//         })
//     })
// }

// writeUpdateExcel();

/* Write files */
//let rowVal,colVal;
// async function excelWriteFile() {

//     let output={
//         "row": -1,
//         "column": -1
//     }

//     const workbook = new excelJs.Workbook();
//     await workbook.xlsx.readFile("C:/Users/rohit/Downloads/excel_download_test.xlsx");
//     const worksheet= workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row,rowNumber)=>{
//         row.eachCell((cell,colNumber)=>{
//             if(cell.value==='Orange'){
//                 output.row=rowNumber;
//                 output.column=colNumber;

//                 console.log(" row Value: "+ output.row +" Column Value is: "+ output.column);
//             }

//         });
//     })

//     const cell =worksheet.getCell(output.row,output.column);
//     cell.value = 'Knight Services';

//     await workbook.xlsx.writeFile("C:/Users/rohit/Downloads/excel_download_test.xlsx");

// }

// excelWriteFile();

/* Refactor the code by write and read functions*/

async function writeExcel(targetVal, path, searchVal) {
  const workbook = new excelJs.Workbook();
  await workbook.xlsx.readFile(path);
  const worksheet = workbook.getWorksheet("Sheet1");

  const output =await readExcel(worksheet,targetVal);

  const cell = worksheet.getCell(output.row, output.column);
  cell.value = searchVal;

  //Save workbook after updating
  await workbook.xlsx.writeFile(path);
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

writeExcel("Apple", "C:/Users/rohit/Downloads/excelInput.xlsx", "Ipad");
