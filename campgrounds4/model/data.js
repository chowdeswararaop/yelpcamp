const { string } = require("joi");
var mongoose=require("mongoose");
const Review = require("./review");
var {cloudinary}=require("../cloudinary")

const ImageSchema =new mongoose.Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});
const opts={toJSON:{virtuals:true}}
var campgroundSchema=new mongoose.Schema({
    title:String,
    images:[ImageSchema],
    price:Number,
    description:String,
    location:String,
    geometry:{
      type:{
        type:String,
        enum:['Point'],
        required:true
      },
      coordinates:{
        type:[Number],
        required:true
      }
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},opts)

campgroundSchema.virtual("properties.popup").get(function () {
   return `<a href="/campgrounds/${this._id}">${this.title}</a>`
  // return "hello"
  
})

campgroundSchema.post("findOneAndDelete",async function(campground) {
  if(campground.reviews.length){
     await Review.deleteMany({_id:{$in:campground.reviews}})
  }  
  if (campground.images) {
    for (const img of campground.images) {
      await cloudinary.uploader.destroy(img.filename);
    }
  }
})



var Campground=mongoose.model("campground",campgroundSchema);
module.exports=Campground;