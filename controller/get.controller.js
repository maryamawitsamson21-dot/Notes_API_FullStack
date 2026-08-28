const taskInModel=require("../model/task.model.js")
const mongoose= require("mongoose")
const getAll=async(req,res)=>{
    try{
 const task= await taskInModel.find({}).populate("user")
 if(task.length===0){
   return res.status(200).send("There is no task found...")
 }
  return res.status(200).json({success:true,data:task})

    }catch(error){
        return res.status(500).send(`there is an error in controller ${error}`)
    }
  

}
const getSpecific=async(req,res)=>{
   try{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(400).json({ message: 'Invalid task ID' });}
 const task= await taskInModel.findById(id).populate("user")
   if(!task){
     return res.status(404).send("There is no task found...")
   }
   return res.status(200).json({success:true,data:task})

   }
  

    catch(error){
        return res.status(500).send(`there is an error in controller ${error}`)
    }
   
}
module.exports={getAll,getSpecific}