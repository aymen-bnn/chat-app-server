
const FriendRequests = require('../models/friendRequestsModel')
const Friends = require('../models/friendsModel')
const sendFriendRequest = async (req , res) => {
    const {senderId , recipientId} = req.body

    const newFriendRequest = new FriendRequests({
        senderId , 
        recipientId , 
        status : 'pending'
    })

    try {
        
        //save the request 
        await newFriendRequest.save()

        return res.status(200).json({message : "request sent successfully"})
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({message : error.message})
    }
}

const acceptFriendRequests = async (req , res ) => {

    const {id} = req.params

    const friendRequest = await FriendRequests.findOne({senderId : id})

    if(!friendRequest){
        throw Error('there is no firend request')
    }

    if(friendRequest.status !== 'pending'){
        throw Error('user has accepted your invitation')
    }

    friendRequest.status = 'accepted'
    try {
        
        //save the request
        await friendRequest.save()
    
        //Create a friends 
        const newFriends = await Friends.create([
            {userId : friendRequest.senderId , friendId : friendRequest.recipientId},
            {userId : friendRequest.recipientId , friendId:friendRequest.senderId}
        ])

        return res.status(200).json({
            message : "friendship accepted",
            friendRequest : friendRequest ,
            newFriends : newFriends
        })

    } catch (error) {
        
        return res.status(500).json({error : error.message})
    }
}

const rejectFriendRequest = async (req, res) => {

    const { id } = req.params

    //fint the friend request 
    const friendRequest = await FriendRequests.findOne({ id })

    if(!friendRequest){
        throw Error("now friend request found")
    }

    friendRequest.status = 'rejected'
    try {
        
        await friendRequest.save()
        res.status(200).json({message : "friend request has been rejected"})

    } catch (error) {
        res.status(400).json({message : "error on server"})
    }

}
//get a single request 
const getSentRequests = async ( req , res) => {

    const {userId} = req.params

    try {
        const sentrequests = await FriendRequests.find({recipientId : userId}) 

        res.status(200).json({sentrequests})
        res
    } catch (error) {
        res.status(400).json({message : error.message})
        
    }
}
const getFriendRequestsRecieved = async (req , res) => {
    const {userId} = req.params 

    try {
        const friendRequestsRecieved = await FriendRequests.find({recipientId : userId , status : 'pending'})

        res.status(200).json({friendRequestsRecieved})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}
module.exports = {sendFriendRequest , acceptFriendRequests , rejectFriendRequest , getSentRequests ,getFriendRequestsRecieved}