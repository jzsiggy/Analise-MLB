const axios = require('axios');

const parseItem = async (item) => {
  const handledObj = {
    title : item.title,
    price : item.price,
    soldQuantity : item.sold_quantity,
    buyingMode : item.buying_mode,
    listingTypeID : item.listing_type_id,
    condition : item.condition,
    thumbnailURL : item.thumbnail,
    url : item.permalink,
    itemLinkApi : `https://api.mercadolibre.com/items/${item.id}`,
    acceptsMercadoPago : item.accepts_mercadopago,
    faturamento : item.price * item.sold_quantity,
    description : '',
  }

  if (handledObj.soldQuantity) {
    const itemDescriptions = await axios.get(`${handledObj.itemLinkApi}/descriptions`)
    .catch(err => {
      console.log('error getting item descriptions');
    });

    if (itemDescriptions) {
      handledObj.description = (itemDescriptions.data[0]['plain_text']);
    };
  };

  return handledObj;
}

const getItemsInCategory = async (id) => {

  itemsInCategory = [];

  let offset = 0;
  let limit = 50;
  let response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&offset=${offset}&limit=${limit}`)
  .catch(err => {
    console.log('error processing request');
  })

  for ( let item of response.data.results ) {
    itemsInCategory.push( await parseItem(item) );
  }
  
  while ( response.data.results.length && offset <= 9950) {
    offset += 50;

    response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&offset=${offset}&limit=${limit}&access_token=${process.env.ACCESS_TOKEN}`)
    .catch(err => {
      console.log(err.response);
    });

    const { data } = response;
    
    for ( let item of data.results ) {
      itemsInCategory.push( await parseItem(item) );
    }
  };
  return itemsInCategory;
};




module.exports = {
  getItemsInCategory,
};