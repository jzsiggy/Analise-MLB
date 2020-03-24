const axios = require('axios');

const getCategoriesOver10000 = (c) => {
  for (item of c) {
    axios.get(`https://api.mercadolibre.com/categories/${item.id}`)
    .then(result => {
      if (result.data.total_items_in_this_category > 10000) {
        console.log(result.data.name , result.data.total_items_in_this_category);
      };
    });
  };
};