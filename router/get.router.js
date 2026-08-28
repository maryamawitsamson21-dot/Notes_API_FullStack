const express=require("express")
const router= express.Router()
const {getAll,getSpecific} =require("../controller/get.controller.js")
router.get("/",getAll)
router.get("/:id",getSpecific)
module.exports=router