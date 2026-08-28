const express=require("express")
const router=express.Router()
const create=require("../controller/create.controller.js")
router.post("/",create)
module.exports=router