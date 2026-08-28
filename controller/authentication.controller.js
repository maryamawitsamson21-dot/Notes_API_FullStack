const user = require("../model/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const register=async (req,res)=>{

    try{
const{email,password,fullname}=req.body
if(!email||!password||!fullname){
    return res.status(400).send("You have to be insert Full Name ,Email and Password. Try again ...")
}
const isFound=await user.findOne({email})
if(isFound){
return res.status(400).send("there is already found. Try again ...")
}
const salt=await bcrypt.genSalt(10)
const hasedPassword=await bcrypt.hash(password,salt)

     const data=await user.create({fullname,email,password:hasedPassword})
    const token= jwt.sign({fullname,id:data._id,email},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})
res.status(201).json({
    success:true,
    data,
    token

})



    }catch(error){
        return res.status(500).send("Server error.")
    }

}


const login=async (req,res)=>{
   try{

     const{email,password}=req.body
if(!email||!password){
    return res.status(400).send("You have to be insert email and password. Try again ...")
}
 

const emailInDataBase=await user.findOne({email})
if(!emailInDataBase){
    return res.status(401).send("there is not found email or password in the database. Try again ...")
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
    return res.status(500).send("Server error.")
   }

}
module.exports={register,login}