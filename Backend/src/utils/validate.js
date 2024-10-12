const validator = require('validator')


const validateSignUpData = (req) => {
    const {firstName,lastName,email,password,mobile} = req.body 


    
    if(!firstName||!lastName||!email||!password||!mobile){
        throw new Error("All Data is Required")
        
        
    }
    if(!validator.isEmail(email)){
        throw new Error("Please Provide Valid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is Very Weak")
    }

}


const validateLoginData = (req) => {

    const {email,password} = req.body

    if(!validator.isEmail(email)){
        throw new Error("Please Provide Valid Email")
    }

}


module.exports = {
validateSignUpData,
validateLoginData
}

