
const router = require('express').Router()

const {createChat , getChatsUser} = require('../controllers/chatControllers')

router.post('/create' , createChat)
router.get('/getchats' , getChatsUser)

module.exports = router