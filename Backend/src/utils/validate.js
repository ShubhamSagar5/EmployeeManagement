const validator = require('validator')


const validateSignUpData = (req) => {
    const {firstName,lastName,email,password,moblie} = req.body 

    if(!firstName || !lastName || !email || !password || !moblie){
        return res.status(401).json({
            success:false,
            message:"All Data is Required"
        })
    }
    if(!validator.isEmail(email)){
        throw new Error("Please Provide Valid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is Very Weak")
    }

}
module.exports = {
validateSignUpData
}

