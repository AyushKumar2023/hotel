const mongoose=require('mongoose')
const roomSchema=new mongoose.Schema({
    hotel:{
        type:String,
        ref:"Hotel",
        required:true,
    },
      roomType:{
        type:String,
        ref:"Hotel",
        required:true,
    },
   pricePerNight:{
        type:Number,
       required:true,
    },
    amenities:{
        type:Array,
        required:true,
    },
    images:[{
        type:String
    }],
    isAvailable:{
        type:Boolean,
        default:true,
    }

},{timestamps:true})

module.exports=mongoose.model('Room',roomSchema)