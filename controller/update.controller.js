const taskInModel = require("../model/task.model")
const mongoose= require("mongoose")
const update=async(req,res)=>{
    try{
    const {id,title,content}=req.body
    if(!id){
        return res.json({success:false,message:"Please provide the id of the task you want to update"})
    }
 if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(400).json({ success: false, message: 'Invalid task ID' });}
 const check=await taskInModel.findById(id)
 if(!check||check.length===0){
 return res.status(404).json({ success: false, message: 'Task not found' });
 }
   const task= await taskInModel.findByIdAndUpdate(id,{title,content},{ new: true })
   if(!task||task.length===0){
    return res.status(404).json({ success: false, message: 'Task not found' });         
   }
   
 return res.status(201).json({success:true,data:task})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:`there is an error in controller ${error}`} )
    }

    
}
module.exports=update