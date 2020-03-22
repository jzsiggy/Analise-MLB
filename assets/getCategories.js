const service = require('axios');
const fs = require('fs');

let categories = [];

const getPathFromRoot = (path) => {
  const identifier = `${path[1]['name']} > ${path[path.length-1]['name']}`;
  return identifier;
}

const getChildrenCategories = async (id) => {
  const response = await service.get(`https://api.mercadolibre.com/categories/${id}`);
  const childrenCategories = response.data['children_categories'];

  if (childrenCategories.length) {
    for (category of childrenCategories) {
      await getChildrenCategories(category.id);
    };
  } else {
    const obj = {
      path : getPathFromRoot(response.data.path_from_root),
      id : response.data.id
    };
    categories.push(obj);
  };
};

getChildrenCategories('MLB1071')


const arr2File = (categories) => {
  fs.writeFile(
  
    './categories.json',
  
    JSON.stringify(categories),
  
    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
  );
};

setTimeout(() => {
  arr2File(categories);
}, 600000);