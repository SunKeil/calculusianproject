const userModel = require("../Models/userModel")
const jwt =require('jsonwebtoken')

const createToken =(_id)=>{
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '12d'})
}

// log in user
const loginUser = async (req, res) =>{
    const {email,password, } = req.body

    try {
        const user = await userModel.login(email,password, )
        //create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error){
        res.status(400).json({error:error.message})
    }
    
}
// sign up user
const signupUser = async (req, res) =>{
    
    const {email,password, lrn} =req.body

    try {
        
        const user = await userModel.signup(email,password,lrn)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error){
        res.status(400).json({error:error.message})
    }
}

const listusers = async (req,res)=>{
    userModel.find({}, (err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
}
// delete a forum 
const deleteUser = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such forum'})
    }

    const user1 = await userModel.findOneAndDelete({_id: id})
    if (!user1){
        return res.status(400).json({error: 'no such forum'})
    }
    res.status(200).json(forum)
}


module.exports = {signupUser,loginUser, listusers,deleteUser}