const express = require('express')
const app = express()
const port = 3000;
const yelp = require('yelp-fusion');

const client = yelp.client('S-mzDAG_qjwp9LyX9z2tH70ntT9U5-APpnd8tsL9jbFcOUBo-PnsRf6Q-LxvBxLhr8zeramerItRx3LQz3zT_OALF62bXAVNm84YXmvDl53EtIsb-uQBpaBOipJIXnYx');


app.get('/home', (req, res) => {
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

