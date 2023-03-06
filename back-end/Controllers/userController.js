const userModel = require("../Models/userModel")
const jwt =require('jsonwebtoken')

const createToken =(_id)=>{
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '12d'})
}

// log in user
const loginUser = async (req, res) =>{
    const {email,password} = req.body

    try {
        const user = await userModel.login(email,password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error){
        res.status(400).json({error:error.message})
    }
    
}
// sign up user
const signupUser = async (req, res) =>{
    const {email,password} =req.body

    try {
        const user = await userModel.signup(email,password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {signupUser,loginUser}