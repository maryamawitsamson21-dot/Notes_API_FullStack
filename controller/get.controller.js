const taskInModel=require("../model/task.model.js")
const userInModel=require("../model/user.model.js")
const mongoose= require("mongoose")
const bcrypt=require("bcrypt")
const getAll=async(req,res)=>{
    try{
      const email = req.headers["x-user-email"];
        const password = req.headers["x-user-password"];
         if (!email || !password) {
            return res.status(401).json({ success: false, message: "Missing email/password headers" });
        }

        const foundUser = await userInModel.findOne({ email});
        if (!foundUser) {
            return res.status(403).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ success: false, message: "Invalid credentials" });
        }
 const task= await taskInModel.find({ user: foundUser._id }).populate("user")
 if(task.length===0){
   return res.status(200).json({success:false,message:"There is no task found..."})
 }
  return res.status(200).json({success:true,data:task})

    }catch(error){
      console.log(error)
        return res.status(500).json({success:false,message:`there is an error in controller ${error}`} )
    }
  

}
const getSpecific=async(req,res)=>{
   try{
    const {_id}=req.params
    const email = req.headers["x-user-email"];
        const password = req.headers["x-user-password"];
         if (!email || !password) {
            return res.status(401).json({ success: false, message: "Missing headers" });
        }
    if(!_id){
        return res.json({success:false,message:"Please provide the id of the task you want to get"})
    }
    
    if(!mongoose.Types.ObjectId.isValid(_id)){ return res.status(400).json({ success: false, message: 'Invalid task ID' });}
 const foundUser = await userInModel.findOne({ email, password });
        if (!foundUser) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        // 🔑 SECURE ISOLATION FILTER: The targeted document must match the task ID AND the user ref ID
        const task = await taskInModel.findOne({ _id: _id, user: foundUser._id }).populate("user");
        
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found or access denied' });
        }
        return res.status(200).json({ success: true, data: task });
   }
  

    catch(error){
      console.log(error)
        return res.status(500).json({success:false,message:`there is an error in controller ${error}`} )  
    }
   
}
module.exports={getAll,getSpecific}