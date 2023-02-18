
const router = require('express').Router()

const {addMessageToChat} = require('../controllers/messagescontollers')

router.post('/add' , addMessageToChat)

module.exports = router