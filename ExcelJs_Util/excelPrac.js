const excelJs = require('exceljs');

const workbook = new excelJs.Workbook();

async function excelTest(){
    await workbook.xlsx.readFile("C:/Users/rohit/Downloads/excel_download_test.xlsx");
    const worksheet = await workbook.getWorksheet('Sheet1');

    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            console.log(cell.value);
        });
    });
}


excelTest();