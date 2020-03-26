const XLSX = require('xlsx');
const { categories } = require('./categories');

const makeSumario = async (categories) => {
  let workBook =  XLSX.utils.book_new()

  let wsName = `sumário`;
  workBook.SheetNames.push(`${wsName}`);

  let catList = []

  for (let counter = 0; counter < categories.length - 1; counter++ ) {
    category = categories[counter];
    
    catList.push({
      path : category['path'],
      id : category['id'],
      enumerador : counter,
    })
  };

  const ws = XLSX.utils.json_to_sheet(catList);
  workBook.Sheets[`${wsName}`] = ws;

  await XLSX.writeFile(workBook, `./assets/data/sumario.xlsb`);
};

makeSumario(categories);