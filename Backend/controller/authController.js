const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    try{
        const {userName, password, phone, email,address } = req.body

        if(!userName || !password || !phone || !email || !address) {
            return res.status(400).json({
                success:false,
                message:'all fields required'
            })
        }

        const checkUser = await userModel.findOne({email})
        if(checkUser){
           return res.status(409).json({
                success:false,
                message:"user already exists"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            userName,
            password:hashpassword,
            phone,
            email,
            address
        })
         return res.status(201).json({
            success:true,
            message:"Register successfully",
            user
        })

    } catch (error) {
        console.log(error)
       return res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        })

    }
}

const loginController =  async (req, res) => {
    try{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:"Please provide email or password"
        })
    }

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }

    const compare = await bcrypt.compare(password,user.password)
    if(!compare) {
        return res.status(500).send({
            success:false,
            message:"invalid credentials"
        })
    }

    const token = jwt.sign({id: user._id},
        process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        return res.status(200).send({
            success:true,   
            message:'login successfully',
            token,
            user
        })

    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in login api",
            error
        })
    }

}

module.exports = {registerController, loginController}