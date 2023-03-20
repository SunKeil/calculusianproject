const express = require('express')

const { listusers, deleteUser} = require('../Controllers/userController')

const router = express.Router()

// log in 
router.get('/', listusers )
router.delete('/', deleteUser )


module.exports = router
