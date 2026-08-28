const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
 
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  
    },
        password:{
        type:String,
        required:true,
        
    }
},{timestamps:true})
const user=mongoose.model('user',userSchema)
module.exports=user