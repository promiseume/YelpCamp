const mongoose = require('mongoose');
const cities = require('./cities');
const campground = require('../models/campground');
const {descriptors, places} = require ('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once("open",() =>{
    console.log('database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await campground.deleteMany({});
  for(let i =0; i < 200; i++){
      const random1000 = Math.floor(Math.random()*1000);
      const price = Math.floor(Math.random() * 20) + 10;
     const camp = new campground({
       //your user id
          author: '6176f16c85b46eb97b67741e',
          location:`${cities[random1000].city},${cities[random1000].state}`,
          title:`${sample(descriptors)} ${sample(places)}`,
          geometry: { 
            "type" : "Point", 
          "coordinates" : [ 
            cities[random1000].longitude,
            cities[random1000].latitude,
          ]
         },
          images:[
            {
              url: 'https://res.cloudinary.com/dgvusj5of/image/upload/v1635352952/Yelpcamp/pzibomzjmcadkslniqzh.jpg',
              filename: 'Yelpcamp/pzibomzjmcadkslniqzh',
            },
            {
              url: 'https://res.cloudinary.com/dgvusj5of/image/upload/v1635353160/Yelpcamp/wwmtngk5vysboeat8yhe.jpg',
              filename: 'Yelpcamp/wwmtngk5vysboeat8yhe',
            }
          ],
          description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus culpa omnis dignissimos tenetur facere ullam nemo, laborum optio doloribus distinctio velit eius architecto libero consequuntur saepe suscipit ad amet explicabo',
          price
    })
      await camp.save();
  }
}
seedDB().then(() => {
    mongoose.connection.close()
});
