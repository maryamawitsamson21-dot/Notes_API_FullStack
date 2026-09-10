const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

    title:{
          type:String,
      
        required:[true,"Title is required"],

    },
    content:{
          type:String,
           required:[true,"Content is required"],
       
    },
 
},{timestamps:true})

const task=mongoose.model('task',taskSchema)
module.exports=task