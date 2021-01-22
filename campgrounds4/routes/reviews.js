var express=require("express");
var router=express.Router({mergeParams:true});
var ErrorHandle=require("../utils/EroorHandling");
var ExpressError=require("../utils/ExpressError");
var Campground=require("../model/data.js");
var Review=require("../model/review.js")
var reviews=require("../controller/review")

var {islogin,isRevAuthor,validateReview, isAuthor}=require("../middleware")

router.post("",islogin,validateReview,ErrorHandle(reviews.newPost))
 router.delete("/:reviewId",islogin,isRevAuthor,reviews.delete)


 module.exports=router