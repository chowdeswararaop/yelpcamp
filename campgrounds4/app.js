if(process.env.NODE_ENV !=="production"){
    require("dotenv").config()
}
console.log(process.env.secret)
var express=require("express");
var app=express();
var path=require("path")
var mongoose=require("mongoose")
var ejsmate=require("ejs-mate");
var session=require("express-session")
var flash=require("connect-flash")
var ExpressError=require("./utils/ExpressError");
var methodOverride=require("method-override")
var campgroundRoutes=require("./routes/campgrounds.js")
var userRoutes=require("./routes/user")
var reviewRoutes=require("./routes/reviews.js")
var passport=require("passport")
var localStrategy=require("passport-local")
var User=require("./model/user");
const { use } = require("./routes/campgrounds.js");
mongoose.connect("mongodb://localhost:27017/yelpcamp4",{
     useNewUrlParser: true, 
     useUnifiedTopology: true, 
     useFindAndModify: false ,
     useCreateIndex: true   //pasport
    })
app.engine("ejs",ejsmate);
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))//req.body
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"public")))
let sessionConfig={
    secret:"theseissecrete",
    resave:false,
    saveUninitialized:true,
    cookie:{
        //httpOnly:false,//by default from the express it's true
        //httpOnly:means it don't share cookies to third party
        expires:Date.now()+1000*60,
        maxAge:1000*60
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());//get into the seesion(store)
passport.deserializeUser(User.deserializeUser());//get out the session(unstore)
//global variables
app.use((req,res,next)=>{
//    console.log(req.session)
res.locals.currentuser=req.user;//for navbar
res.locals.success=req.flash("success");
res.locals.error=req.flash("error")
next();
})
app.use("/campgrounds",campgroundRoutes)
app.use("/campgrounds/:id/reviews",reviewRoutes)
app.use("/",userRoutes)



//--------------ROUTE----------------//
app.get("/",(req,res)=>{
     res.render("campgrounds/welcome.ejs")
})
app.get("/register",(req,res)=>{
    res.render("campgrounds/register.ejs")
})


app.listen(3000,"127.0.0.1",()=>{
console.log("server started")
})