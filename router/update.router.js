const express=require("express")
const router=express.Router()
const update=require("../controller/update.controller.js")
router.post("/",update)
module.exports=router