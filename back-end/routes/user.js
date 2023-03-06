const express = require('express')

const {signupUser, loginUser} = require('../Controllers/userController')

const router = express.Router()

// log in 
router.post('/login', loginUser)
router.post('/sign-up', signupUser)

module.exports = router

