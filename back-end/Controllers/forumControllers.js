const ForumModel = require('../Models/forumschema')
const mongoose = require('mongoose')
const { route } = require('../routes/forum')

//get all forums
const getForum = async (req,res) =>{
    const forum = await ForumModel.find({}).sort({createdAt: -1})
    res.status(200).json(forum)
}


//get a single forum
const getSingleForum = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such forum"})
    }
    const forum = await ForumModel.findById(id)
    if (!forum){
        return res.status(404).json({error: 'no such forum'})
    }
    res.status(200).json(forum)
}

//create a forum
const createForum = async (req,res)=>{
    const {title, description} = req.body
    
    let blankInput =[]
    
    if(!title){
        blankInput.push('title')
    }
    if(!description){
        blankInput.push('description')
    }
    if(blankInput.length > 0 ){
        return res.status(400).json({error: 'Please fill all the emthy fields'})
    }

    // add data to db
    try {
        const forum = await ForumModel.create({
            title, 
            description
        })
        res.status(200).json(forum)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a forum 
const deleteForum = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such forum'})
    }

    const forum = await ForumModel.findOneAndDelete({_id: id})
    if (!forum){
        return res.status(400).json({error: 'no such forum'})
    }
    res.status(200).json(forum)
}
// update forum
const updateForum = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such forum'})
    }
    const forum = await ForumModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!forum){
        return res.status(400).json({error: 'no such forum'})
    }
    res.status(200).json(forum)
}
module.exports = {
     createForum,
     getForum,
     getSingleForum,
     deleteForum,
     updateForum
}