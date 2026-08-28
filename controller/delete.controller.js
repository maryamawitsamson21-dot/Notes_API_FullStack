const mongoose= require("mongoose")
const taskInModel=require("../model/task.model.js")
const deleteUser=async(req,res)=>{
const{id,title,content}=req.body
  if(!id){
        return res.send("ID is needed... ")
    }
     if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(400).json({ message: 'Invalid task ID' });}
   const task= await taskInModel.findByIdAndDelete(id)
   
   if(!task||task.length===0){
     return res.status(404).send("There is no task found...")
   }return res.status(201).json({success:true,data:task})
}
module.exports=deleteUser