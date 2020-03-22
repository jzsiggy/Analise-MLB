const axios = require('axios');

const { categories } = require('./assets/categories');

const getItemsInCategory = async (id) => {
  const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&offset=50&limit=1`);
  console.log(response.data);
};

getItemsInCategory(categories[1]['id']);
