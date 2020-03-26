const XLSX = require('xlsx');
require('dotenv').config();

const { getNow } = require('./assets/getNow');
const { getItemsInCategory } = require('./assets/getItemsInCategory');
const { categories } = require('./assets/categories');

getAllItemsByCat = async (categoryList) => {
  let counter = 189;
  let workBook =  XLSX.utils.book_new()

  for (let category of categoryList) {

    console.log(`{{[[ ¡! STARTING !¡ ]]}} ${counter} : ${category['path']} AT ${getNow()}`);

    let items = await getItemsInCategory(category['id']);

    let wsName = `${counter}_${category['path']}`.slice(0, 31);
    
    workBook.SheetNames.push(`${wsName}`);
    const ws = XLSX.utils.json_to_sheet(items);
    workBook.Sheets[`${wsName}`] = ws;

    console.log(`${counter} : ${category['path']} saved to SHEET - ${wsName}. ${items.length} items... AT ${getNow()}`);
    counter++;

    if (counter % 7 == 0 || category['id'] == 'MLB1126') {
      console.log(`{[{[ ... WRITING SAVED SHEETS TO FILE --> ${getNow()} ... ]}]}`)
      await XLSX.writeFile(workBook, `./assets/data/data_7.xlsb`);
      console.log(`{[{[ FILES WRITTEN  -- ${getNow()}]}]}`)
    };
  };
};

getAllItemsByCat(categories)