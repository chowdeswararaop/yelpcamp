const express=require("express");
const router=express.Router();
var ErrorHandle=require("../utils/EroorHandling");
var Campground=require("../model/data.js");
var {islogin,isAuthor,campgroundValidation}=require("../middleware")
var User=require("../model/user");
const { use } = require("./user");
var campgrounds=require("../controller/campgrounds")
var multer  = require('multer')
var {storage}=require("../cloudinary")
var upload = multer({ storage })
router.route("")
      .get(ErrorHandle(campgrounds.index))
      .post(islogin,upload.array("image"),ErrorHandle(campgrounds.newPost))
       
 router.get("/new",islogin,campgrounds.new)

router.route("/:id")
      .get(ErrorHandle(campgrounds.show))
      .put(islogin,isAuthor,upload.array("image"),campgroundValidation,ErrorHandle(campgrounds.update))
      .delete(islogin,isAuthor,ErrorHandle(campgrounds.delete))

router.get("/:id/edit",islogin,isAuthor,ErrorHandle(campgrounds.showEdit))


router.delete("",ErrorHandle(async(req,res)=>{
    await Campground.deleteMany({});
    res.redirect("/campgrounds");
}));



module.exports=router