
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const createChat = async(req , res) => {

    const { users } = req.body
    for(let user of users){
        const exists = await User.findById(user)

        if(!exists){
            throw new Error("user doesn't exist")
        }
    }
    try {
        
        const chat = await Chat.create({users})


        res.status(200).json({chat , status : "chat created between users"})
    } catch (error) {
        
        res.status(400).json({message : error.message})
    }

}
const getChatsUser = async ( req , res ) =>{

    const { userId } = req.params

    try {
        //getAllchats
        const chatsUser = await Chat.findOne({ userId })
        .populate('users' ,'username' )
        .populate('messages.sender' , 'username')

        res.status(200).json(chatsUser)
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}   

module.exports = {createChat , getChatsUser}