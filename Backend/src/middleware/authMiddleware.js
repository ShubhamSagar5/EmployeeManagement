const jwt = require('jsonwebtoken')
const { User } = require('../models/UserSchema')


const userAuth = async (req,res,next) => {
    
    try {
        const {Token} = req.cookies 
        

        if(!Token){
            throw new Error ("Token is Mssing Please Login ")
        }
    
        const decode = await jwt.verify(Token,process.env.JWTSECRET) 
    
        if(!decode){
            throw new Error ("Token Not verify")
        }
    
        const user = await User.findById({_id:decode._id}) 

        if(!user){
            throw new Error("User With Token Not Found")
        }
    
        req.user = user 
    
        next()
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    userAuth
}

