
const mongoose = require("mongoose")


const carWashSchema = new mongoose.Schema({
    carName:{
        type:String,
        require:true
    },
    bill:{
        type:String,
        require:true
    },
    commission:{
        type:String,
        require:true
    },
    carWasher:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
     
    }
   
 
   
},{ timestamps: true })


const carWash = mongoose.model("carWash" , carWashSchema)
module.exports = carWash