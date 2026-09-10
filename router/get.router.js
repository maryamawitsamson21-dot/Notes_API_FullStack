const express=require("express")
const router= express.Router()
const {getAll,getSpecific} =require("../controller/get.controller.js")
router.get("/",getAll)
router.get("/specific",getSpecific)
module.exports=router