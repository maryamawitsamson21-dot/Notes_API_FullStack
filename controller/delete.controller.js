const mongoose= require("mongoose")
const taskInModel=require("../model/task.model.js")
const userInModel=require("../model/user.model.js")
const bcrypt=require("bcrypt")
const deleteUser=async(req,res)=>{
const{_id}=req.body
        const email = req.headers["x-user-email"];
        const password = req.headers["x-user-password"];
           if (!email || !password) {
            return res.status(401).json({ success: false, message: "Missing credentials to delete task" });
        }
  if(!_id){
        return res.json({success:false,message:"Please provide the id of the task you want to delete"})
    }
     if(!mongoose.Types.ObjectId.isValid(_id)){ return res.status(400).json({ success: false, message: 'Invalid task ID' });}
        const foundUser = await userInModel.findOne({ email });
        if (!foundUser) {
            return res.status(403).json({ success: false, message: "Unauthorized credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ success: false, message: "Unauthorized credentials" });
        }

   const task= await taskInModel.findByIdAndDelete({
       _id: _id, 
            user: foundUser._id 
   })
   
   if(!task||task.length===0){
     return res.status(404).json({ success: false, message: 'Task not found' });
   }return res.status(201).json({success:true,data:task})
}
module.exports=deleteUser