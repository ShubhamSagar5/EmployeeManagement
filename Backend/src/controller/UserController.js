const { User } = require("../models/UserSchema")
const { validateSignUpData } = require("../utils/validate")
const bcrypt = require('bcrypt')


const SignUp = async(req,res)=>{
    try {
        
        const {password} = req.body

       validateSignUpData(req)

        const hashPassword = await bcrypt.hash(password,10) 

        const user = new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
            mobile
            
        })

        await user.save() 

        return res.status(200).json({
            success:false,
            message:"User Sign up Successfully",
            data:user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    SignUp
}