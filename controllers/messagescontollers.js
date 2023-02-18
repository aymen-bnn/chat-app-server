
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const Messages = require('../models/messagesModel')

const addMessageToChat = async(req , res) => {

    const {userId , chatId , content}= req.body

    try {

        //find the sender 
        const sender = await User.findById(userId)

        if(!sender){
            throw new Error('sender is not found')
        }

        //find chat 
        const chat = await Chat.findById(chatId)

        if(!chat){
            throw new Error('no chat is found')
        }

        //while creating a message now we need to puth it to the messages of the chat
        const chatUpdated = await Chat.findByIdAndUpdate(
            chatId,
            {
              $push: {
                messages: {
                  sender: sender,
                  content: content
                }
              }
            },
            { new: true }
          )
        res.status(200).json(chatUpdated)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {addMessageToChat}