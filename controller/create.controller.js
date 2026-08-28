const taskInModel= require("../model/task.model")

const create=async(req,res)=>{
    try{
  const {title,content}=req.body
    const id=await taskInModel.countDocuments()*1+1
   const task= await taskInModel.create({id,title,content})
    return res.status(200).json({success:true,data:task})

    }catch(error){
         return res.status(500).send(`there is an error in controller ${error}`)
    }
  
}
module.exports=create