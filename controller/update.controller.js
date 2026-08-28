const taskInModel = require("../model/task.model")
const mongoose= require("mongoose")
const update=async(req,res)=>{
    try{
    const {id,title,content}=req.body
    if(!id){
        return res.send("ID is needed... ")
    }
 if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(400).json({ message: 'Invalid task ID' });}
 const check=await taskInModel.findById(id)
 if(!check||check.length===0){
 return res.status(404).send("not found ...")
 }
   const task= await taskInModel.findByIdAndUpdate(id,{title,content},{after:true})
   
 return res.status(201).json({success:true})

    }catch(error){
        return res.status(500).send(`there is an error in controller ${error}`)
    }

    
}
module.exports=update