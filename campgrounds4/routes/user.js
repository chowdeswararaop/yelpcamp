const express=require("express");
const passport = require("passport");
const router=express.Router();
var ErrorHandle=require("../utils/EroorHandling");
var user=require("../controller/user")



router.post("/register",ErrorHandle(user.register))


var middle=passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"})
//middleware by passport checking the give data from the  local database otherwise shoes the error message 
router.route("/login")
      .get(user.login)
      .post(middle,user.loginPost)

router.get("/logout",user.logout)

module.exports=router