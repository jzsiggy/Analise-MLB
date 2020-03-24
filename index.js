const XLSX = require('xlsx');
require('dotenv').config();

const { getItemsInCategory } = require('./assets/getItemsInCategory');
const { categories } = require('./assets/categories');

getAllItemsByCat = async (categoryList) => {
  let counter = 0;
  let workBook =  XLSX.utils.book_new()

  for (let category of categoryList) {

    console.log(`{{[[ ¡! STARTING !¡ ]]}} ${counter++} : ${category['path']}.`);

    let items = await getItemsInCategory(category['id']);

    let wsName = `${counter}_${category['path']}`.slice(0, 31);
    
    workBook.SheetNames.push(`${wsName}`);
    const ws = XLSX.utils.json_to_sheet(items);
    workBook.Sheets[`${wsName}`] = ws;

    console.log(`${counter++} : ${category['path']} saved to SHEET - ${wsName}. ${items.length} items...`);

    if (counter % 7 == 0 || category['id'] == 'MLB1126') {
      console.log("{[{[ ... WRITING SAVED SHEETS TO FILE ... ]}]}")
      await XLSX.writeFile(workBook, `./assets/data/data_2.xlsb`);
      console.log('{[{[ FILES WRITTEN ]}]}')
    };
  };
};

getAllItemsByCat(categories)