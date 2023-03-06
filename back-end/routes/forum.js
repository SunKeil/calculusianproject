const express = require('express')
const { createForum,
        getForum,
        getSingleForum,
        deleteForum,
        updateForum
    } = require('../Controllers/forumControllers')

const requireAuth = require('../Middleware/requireAuth')
const router = express.Router()
 
router.use(requireAuth)


// get all forumss
router.get('/',getForum)
//get singel forums
router.get('/:id', getSingleForum)
// create new forum
router.post('/', createForum)

// delete single forum
router.delete('/:id', deleteForum)
// update forum
router.patch('/:id', updateForum)
module.exports = router