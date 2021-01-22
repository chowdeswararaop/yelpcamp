const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../model/data');

mongoose.connect('mongodb://localhost:27017/yelpcamp4', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected")
})
let sample=araay=>araay[Math.floor(Math.random()*araay.length)];


const seedDB=async()=>{
    await Campground.deleteMany({});
    for(var i=0;i<50; i++){
        let random1000=Math.floor(Math.random()*1000);
        let price=Math.floor(Math.random()*20)+10;
        let c=new Campground({
          //location:`${cities[random1000].city},${cities[random1000].state}` 
         author:"6006775e8695a506dc1a8e0a",
         location:(cities[random1000].city+","+cities[random1000].state),
         geometry:{type:"Point",coordinates:[cities[random1000].longitude,cities[random1000].latitude]},

         title:sample(descriptors)+" "+sample(places),
         images:[{
         url: 'https://res.cloudinary.com/chowdes1234/image/upload/v1611079003/yelpcamp/tg3xji2ysxwuwixnklgf.png',
         filename: 'yelpcamp/tg3xji2ysxwuwixnklgf'
        },
    {url: 'https://res.cloudinary.com/chowdes1234/image/upload/v1611079868/yelpcamp/zkmdanapfmsrt0pwljzv.png',
    filename: 'yelpcamp/zkmdanapfmsrt0pwljzv'
  },],
         description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur inventore deserunt tempora ",
         price
        });
         await c.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()

})