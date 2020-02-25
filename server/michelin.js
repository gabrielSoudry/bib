const axios = require('axios');
const cheerio = require('cheerio');

let restaurantsMichelin = [];

async function get_restaurant() 
{
   const result  = axios.get('http://apir.viamichelin.com/apir/2/findPOI.json2/RESTAURANT/fra?&&filter=bib_gourmand%20eq%201&source=RESGR&charset=UTF-8&ie=UTF-8', {
    params: {
      authKey: "RESTGP20200121150019479872542554",
      center:"2.3488:48.8534",
      dist: 200000,
      nb: 100
    }
  })
  .then(function (response) {
    response.data.poiList.forEach(element => {
      restaurantsMichelin.push(element.datasheets[0]['name']);
    });
  })
  .catch(function (error) {
   return -1;
  })
}

module.exports.get = () => {
  get_restaurant();
  return restaurantsMichelin;
};