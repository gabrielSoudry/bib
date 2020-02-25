const axios = require('axios');
const cheerio = require('cheerio');

let restaurantsMaitre = [];

async function get_restaurants_by_page(page) 
{
    const result = await axios({
      method: 'post',
      url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
      data: 'request_id=96f9651b5c9523bd7ec12c53db996d4c'+'&page='+page
    });
    return result;
}

const parse = data => 
{
    const $ = cheerio.load(data);
    $('.single_libel a').each((i, element) =>
    {
        var restaurant = $(element).text();
        var index = 0;
        restaurant = restaurant.substring(13)
        for (i=0;i<restaurant.length;i++) 
        {
          if (restaurant[i]=="("){
            index = i
          }
        }
        restaurantsMaitre.push(restaurant.slice(0,index-1));
    });
};

module.exports.scrapeRestaurant = async page_nb => 
{
    const result = await get_restaurants_by_page(page_nb);
    const {data, status} = result;  
    if (status >= 200 && status < 300) {
        return parse(data);
    }
      console.error(status);
    return result;
};

module.exports.get = () => {
  return restaurantsMaitre;
};