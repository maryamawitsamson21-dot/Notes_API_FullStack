const express=require("express")
const router=express.Router()
const deleteUser=require('../controller/delete.controller.js')

router.post("/",deleteUser)
module.exports=router