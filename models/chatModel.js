const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatModel = new Schema({

    users : [{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    }],

    messages : [
        {
            sender : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required: true
            },
            content : {
                type : String , 
                required : true
            },
            timesent : {
                type: Date ,
                default : Date.now
            }
        }
    ],
})

module.exports = mongoose.model('Chat' , chatModel)