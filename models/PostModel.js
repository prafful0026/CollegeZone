const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema =new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User" },
    text:{type:String,required:true },
    location:{type:String },
    likes:[{user:{type:Schema.Types.ObjectId,ref:"User" }}],
    picUrl:{type:String}, 
    comments:[
        {
            _id:{type:String,required:true},
            user:{type:Schema.Types.ObjectId,ref:"User" },
            text:{type:String,required:true},
            date:{type:Date,default:Date.now}
        }
    ]

},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)