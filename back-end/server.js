const express = require('express')
require('dotenv').config()
const cors = require('cors')
//expresapp
const app = express()
const forumRoute = require('./routes/forum')
const userRoute = require('./routes/user')
const userAdmin = require('./routes/admin')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
app.use(cors())
//routes
app.use('/api/forum',forumRoute)
app.use('/api/user', userRoute)
app.use('/admin/users', userAdmin)
//connet to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    //listen for request 
    app.listen(process.env.PORT, ()=>{
        console.log('connected to db and listening to port',process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
})




