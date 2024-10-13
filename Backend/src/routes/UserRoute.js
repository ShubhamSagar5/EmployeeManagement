const express = require('express')
const { SignUp, login, deleteUser, getUser, getListOfUser, updateUser, logout } = require('../controller/UserController')
const { userAuth } = require('../middleware/authMiddleware')

const UserRouter = express.Router() 

UserRouter.post("/signup",SignUp) 
UserRouter.post("/login",login)
UserRouter.delete("/delete/:id",userAuth,deleteUser)
UserRouter.get('/userProfile/:id',userAuth,getUser)
UserRouter.get('/users',userAuth,getListOfUser)
UserRouter.patch("/update/:id",userAuth,updateUser)
UserRouter.get("/logout",userAuth,logout)


module.exports = UserRouter