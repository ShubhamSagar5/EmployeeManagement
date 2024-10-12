const express = require('express')
const { SignUp, login, deleteUser } = require('../controller/UserController')
const { userAuth } = require('../middleware/authMiddleware')

const UserRouter = express.Router() 

UserRouter.post("/signup",SignUp) 
UserRouter.post("/login",login)
UserRouter.delete("/delete/:id",userAuth,deleteUser)


module.exports = UserRouter