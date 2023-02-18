const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendsModel = new Schema({

    userId : {type : mongoose.Schema.Types.ObjectId , required : true},
    friendId : {type : mongoose.Schema.Types.ObjectId , required : true},
    Date : { type : Date , default : Date.now}
})

module.exports = mongoose.model('Friends' , friendsModel)