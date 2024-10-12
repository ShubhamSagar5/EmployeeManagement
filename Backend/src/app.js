const express = require('express')
const DBConnection = require("./config/DatabaseConnection")
const dotenv = require('dotenv')
const UserRouter = require('./routes/UserRoute')
const cookieParser = require('cookie-parser')

const app = express() 

dotenv.config({
    path:"./.env"
})

app.use(express.json())
app.use(cookieParser())

app.use("/",UserRouter)


DBConnection()
.then(()=>{
    console.log("Database Connected Successfully")

    app.listen(process.env.PORT,(req,res)=>{
        console.log("Server is Listen on Port " + process.env.PORT)
    })
})
.catch((err)=>{
    console.log("Database Can Not Connected"+ err.message)
})