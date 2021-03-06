const express = require('express')
const app = express()
const port = 3000;
const yelp = require('yelp-fusion');
require('dotenv').config()
const API_KEY = process.env.API_KEY;


const client = yelp.client(API_KEY);

app.get('/restaurants', (req, res) => {
   let business = [];
   client.search({
      categories: 'Restaurants',
      location: 'san francisco',
      radius: '4000'
   }).then(response => {
      response.jsonBody.businesses.map(query => {
         business.push({
            name: query.name,
            image: query.image_url,
            url: query.url,
            phone: query.phone,
            review_count: query.review_count,
            rating: query.rating
         }
         );
      });
      res.json(business);
   }).catch(e => {
      res.json(e);
   });
});





app.listen(port, () => console.log(`DELIGHT app listening on port ${port}!`));