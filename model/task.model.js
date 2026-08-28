const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true,
      
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

    title:{
          type:String,
      
        required:true,

    },
    content:{
          type:String,
           required:true,
       
    },
 
},{timestamps:true})

const task=mongoose.model('task',taskSchema)
module.exports=task