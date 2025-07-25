const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isUser:{
        type:Boolean,
        default:true
    },
  
})


const User = mongoose.model("user" , userSchema)
module.exports = User