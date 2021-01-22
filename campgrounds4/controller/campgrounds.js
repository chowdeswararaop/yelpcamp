var Campground=require("../model/data.js");
var {cloudinary}=require("../cloudinary")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder=mbxGeocoding({accessToken:process.env.mbxToken})
module.exports.index=async(req,res)=>{
    let campgrounds= await Campground.find()
     res.render("campgrounds/home",{campgrounds})
  
 }
 module.exports.new=(req,res)=>{
    res.render("campgrounds/new")
 }
 module.exports.newPost=async(req,res,next)=>{
 const  response= await geocoder.forwardGeocode({
         query:req.body.campground.location,
         limit:1
     }).send() 
 
    const campground=new Campground(req.body.campground); 
    campground.geometry=response.body.features[0].geometry
    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}))
    campground.author=req.user._id//from passport
    await campground.save();
    req.flash("success","Succesfully made a new campground")
    res.redirect(`/campgrounds/${campground.id}`)
}
module.exports.show=async(req,res)=>{
    let {id}=req.params;                         //populate("reviews")
    let campground=await Campground.findById(id).populate({
        path:"reviews",
        populate:{path:"author"}
    }).populate("author")
    //console.log(campground)
    if(!campground){
        req.flash("error","cannot find that campground")
         return res.redirect("/campgrounds")
    }
    res.render("campgrounds/show",{campground})
}
module.exports.showEdit=async(req,res)=>{
    let {id}=req.params;
    let campground=await Campground.findById(id)
     if(!campground){
        req.flash("error","cannot find that campground")
         return res.redirect("/campgrounds")
    }
 res.render("campgrounds/edit",{campground})
}
module.exports.update=async(req,res)=>{
    const {id}=req.params;
   const campground= await Campground.findByIdAndUpdate(id,{...req.body.campground})
   const imgs=req.files.map(f=>({url:f.path,filename:f.filename}))
   campground.images.push(...imgs)
    await campground.save()
    if(req.body.deleteimages){
        for(let filename of req.body.deleteimages){
        await   cloudinary.uploader.destroy(filename)
        }
      await  campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteimages}}}},{ new: true })
    }
   
    req.flash("success","Succesfully updated campground")
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.delete=async(req,res)=>{
    let {id}=req.params;
   const campground= await Campground.findByIdAndDelete(id);
   req.flash("success","Succesfully deleted the campground")
   res.redirect("/campgrounds");
}