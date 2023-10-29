const mongoose=require('mongoose')

const UserSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        default:"Regular",
    },
    date:{
        type:Date,
        default:Date.now,
    }
    
})

module.exports=mongoose.model('user',UserSchema)