const express=require("express")
const router=express.Router()
const deleteUser=require('../controller/delete.controller.js')

router.delete("/",deleteUser)
module.exports=router