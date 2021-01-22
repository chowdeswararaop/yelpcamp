var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose")

var userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})
userSchema.plugin(passportLocalMongoose)
var User=mongoose.model("User",userSchema)
module.exports=User