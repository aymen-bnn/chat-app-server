const express = require('express')
const { 
    sendFriendRequest , 
    acceptFriendRequests , 
    rejectFriendRequest , 
    getSentRequests,
    getFriendRequestsRecieved} = require('../controllers/friendRequestControllers')

const router = express.Router()

router.post('/sendRequest' , sendFriendRequest)
router.put('/request/:id/accept' , acceptFriendRequests)
router.put('/request/:id/reject' , rejectFriendRequest)
router.get('/requests/:userId', getSentRequests)
router.get('/requests/res/:userId', getFriendRequestsRecieved)

module.exports = router