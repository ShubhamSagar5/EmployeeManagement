const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema  = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,"First Name At least Contain 3 Letter"],
        maxLength:[10,"First Name Contain at Most 10 Letter"]
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,"First Name At least Contain 3 Letter"],
        maxLength:[10,"First Name Contain at Most 10 Letter"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please provide valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please provide strong password")
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Please Provide Valid Phone Number")
            }
        }
    }
},{
    timestamps:true
})


userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this 
    const hashPassword = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,hashPassword) 

    console.log(isPasswordValid)
    return isPasswordValid

}

userSchema.methods.generateJWT = async function(){
    const user = this 

    const getJWT = await jwt.sign({_id:user._id},process.env.JWTSECRET,{expiresIn:"1d"}) 

    return getJWT

}

const User = mongoose.model("User",userSchema) 



module.exports = {
    User
} 