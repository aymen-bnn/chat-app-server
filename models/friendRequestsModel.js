
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendRequestModel = new Schema({

    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true
    
    },
    recipientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true 
    },
    status : {
        type : String,
        enum : ['pending' , 'accepted' , 'rejected' , 'removed'],
        default : 'pending'
    },
    created : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongoose.model('FriendRequests' , friendRequestModel)