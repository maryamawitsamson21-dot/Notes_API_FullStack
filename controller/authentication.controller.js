const user = require("../model/user.model")
const bcrypt=require("bcryptjs")


const register=async (req,res)=>{

    try{
const{email,password,fullname}=req.body
if(!email||!password||!fullname){
    return res.status(400).json({success:false,message:"Please provide email, password and fullname. Try again ..."})               
}
const isFound=await user.findOne({email})
if(isFound){
return res.status(400).json({success:false,message:"This email is already registered. Please log in."})
}
const salt=await bcrypt.genSalt(10)
const hasedPassword=await bcrypt.hash(password,salt)

     const data=await user.create({fullname,email,password:hasedPassword})
    
res.status(201).json({
    success:true,

  

})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:`there is an error in controller ${error}`} )
    }

}


const login=async (req,res)=>{
   try{

     const{email,password}=req.body
if(!email||!password){
    return res.status(400).json({success:false,message:"Please provide email and password. Try again ..."})
}
 

const emailInDataBase=await user.findOne({email})
if(!emailInDataBase){
    return res.status(401).json({success:false,message:"there is not found email or password in the database. Try again ..."})
}
const crypt=await bcrypt.compare(password,emailInDataBase.password)
if(!crypt){
     return res.status(401).send("there is not found email or password in the database. Try again ...")
}
     const token = jwt.sign(
        { fullname: emailInDataBase.fullname, id: emailInDataBase._id, email: emailInDataBase.email },
            
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "15d" }
        )
 return res.status(200).json({
    success:true,
    id: emailInDataBase._id,
    message: "You login successfully.",
    emailInDataBase:emailInDataBase.email,
    token
 })
 
   }
   catch(error){
    return res.status(500).json({success:false,message:`there is an error in controller ${error}`})} 

}
module.exports={register,login}     
