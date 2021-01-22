var Campground=require("../model/data.js");
var Review=require("../model/review.js")
module.exports.newPost=async(req,res)=>{

    const campground=await Campground.findById(req.params.id)
    const review=new Review(req.body.review)
    review.author=req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash("success","credted a review")
    res.redirect(`/campgrounds/${campground.id}`)
 }
 module.exports.delete=async(req,res)=>{
    //const campground=await Campground.findById(req.params.id)
     await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${req.params.id}`)
    // res.redirect(`/campgrounds/${campground.id}`)
    // const {id ,reviewId}=req.params
    //  await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    //  await Review.findByIdAndDelete(reviewId)
    //  res.redirect(`/campgrounds/${id}`)
}