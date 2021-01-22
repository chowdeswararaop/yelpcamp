
const User=require("../model/user")

module.exports.register=async(req,res,next)=>{
    try{
     var {username,password,email}=req.body
     var user=new User({username,email})
     var registeredUser=await User.register(user,password)
     req.login(registeredUser,err=>{
         if(err){return next(err)};
         req.flash("success","welcome to yelpcamp")
         res.redirect("/campgrounds")
     })
    }catch(e){
        req.flash("error",e.message)//from passport
        res.redirect("/")
    }
 }

 module.exports.login=(req,res)=>{
     res.render("campgrounds/login")
 }

 module.exports.loginPost=(req,res)=>{
    req.flash("success","welcome back")
    var redirectUrl=req.session.returnTo||"/campgrounds"
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout=(req,res)=>{
    req.logout();
    req.flash("success","signed out")
    res.redirect("/campgrounds")
}