const { User } = require("../models/UserSchema")
const { validateSignUpData, validateLoginData, validateUpdateData } = require("../utils/validate")
const bcrypt = require('bcrypt')


const SignUp = async(req,res)=>{
    try {
        
        const {firstName,lastName,email,password,mobile} = req.body

       validateSignUpData(req,res)

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

const login = async(req,res)=>{
    try {
        
        const {email,password}  = req.body

        validateLoginData(req)

        const user = await User.findOne({
            email:email
        })

        if(!user){
            throw new Error("User Not Found Please Sign Up")
        }

        const isPasswordValid = await user.validatePassword(password) 


        if(!isPasswordValid){
            throw new Error ("Please Provide Valid Password")
        }

        const token = await user.generateJWT()

        res.cookie("Token",token,{expires:new Date(Date.now() + 2 * 24 * 60  * 60 * 1000)})

        return res.status(200).json({
            success:true,
            message:`${user.firstName} login Successfully`
        })


    } catch (error) {
        return  res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteUser = async(req,res) => {
    try {
        
        const userId = req.params.id 


        const user = await User.findByIdAndDelete(userId) 

        if(!user){
            throw new Error("Please Provide Valid User ID")
        }

        return res.status(200).json({
            success:true,
            message:"User Delete Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            succesS:false,
            message:error.message
        })
    }
}

const getUser = async(req,res) => {
    try {
        
        const {id} = req.body 

        const user = await User.findById(id) 

        if(!user){
            throw new Error("Please Provide Valid ID")
        }

        return res.status(200).json({
            success:true,
            message:'User Data Profile',
            data:user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getListOfUser = async(req,res)=>{
    try {
    
        const UserList = await User.find() 

        return res.status(200).json({
            success:true,
            message:'User List',
            data:UserList
        })
           

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}


const updateUser = async(req,res) => {
    try {
        

        const {id} = req.params

        const {firstName,lastName,email,password,mobile} = req.body

        validateUpdateData(req,res) 

        const user = await User.findByIdAndUpdate(id,{
            firstName,
            lastName,
            email,
            mobile
        },{new:true}).select('-password')
 

        if(!user){
            throw new Error("User Not Found Please Provide Valid Id")
        }

        return res.status(200).json({
            success:true,
            message:'User Data Update Successfully',
            data:user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async(req,res) => {
    try {
        
        const {firstName} = req.user 
        console.log(req.user)

        res.clearCookie("Token")
        return res.status(200).json({
            success:true,
            message:`${firstName} is Logout Successfully`
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}





module.exports = {
    SignUp,
    login,
    deleteUser,
    getUser,
    getListOfUser,
    updateUser,
    logout
}