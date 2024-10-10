const mongoose = require('mongoose')
const valiadator = require('validator')


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
            if(!valiadator.isEmail(value)){
                throw new Error("please provide valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!valiadator.isStrongPassword(value)){
                throw new Error("Please provide strong password")
            }
        }
    },
    mobile:{
        type:Number,
        required:true,
        trim:true,
        min:10,
        max:10
    }
},{
    timestamps:true
})


// userSchema.methods.validatePassword =  async function(passwordInputbyUser){
//     const user = this 
//     const password
// }


const User = mongoose.model("User",userSchema) 



module.exports = {
    User
} 