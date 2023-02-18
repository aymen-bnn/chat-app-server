const mongoose = require('mongoose')

const messagesModel = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Chat',
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('Messages' , messagesModel)