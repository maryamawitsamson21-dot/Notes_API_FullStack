const taskInModel= require("../model/task.model")
const userInModel=require("../model/user.model.js") 
const bcrypt=require("bcrypt")

const create=async(req,res)=>{
    try{
  const {title,content}=req.body
  const email = req.headers["x-user-email"];
        const password = req.headers["x-user-password"];
if (!email || !password) {
            return res.status(401).json({ success: false, message: "Missing email/password headers" });
        }
        
         const foundUser = await userInModel.findOne({ email });

        if (!foundUser) {
            return res.status(403).json({ success: false, message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ success: false, message: "Invalid email or password" });
        }
   const task= await taskInModel.create({title,content, user: foundUser._id})
    return res.status(200).json({success:true,data:task})

    }catch(error){
      
     
         return res.status(500).json({success:false,message:error.message|| "Server error..."})
    }
  
}
module.exports=create