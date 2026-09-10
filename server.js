const dns=require("dns")
dns.setServers(["8.8.8.8"])
const cors=require("cors")
require("dotenv").config()
const express=require("express");
const path=require("path");
const connection =require("./database/mongoose.js")
const getRouter=require('./router/get.router.js')
const createRouter=require('./router/create.router.js')
const updateRouter=require('./router/update.router.js')
const deleteRouter=require('./router/delete.router.js')
const autherization=require("./router/authentication.router.js")
const auth=require("./middlewares/auth.middleware.js")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/notes",express.static(path.join(__dirname,"frontend/homepage")))
app.get("/notes/auth", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/login", "login.html"))
})

app.use("/notes/get",getRouter)
app.use("/notes/create",createRouter)
app.use("/notes/update",updateRouter)
app.use("/notes/delete",deleteRouter)
app.use("/notes/auth",autherization)


  

app.listen(process.env.PORT,async()=>{
    await connection()
    console.log(`Server is running on ${process.env.PORT}`)
})

