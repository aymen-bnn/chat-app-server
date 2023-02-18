
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

//import the routes
const userRoutes = require('./routes/userRoutes')
const friendRequestsRoutes = require('./routes/friendRequestsRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
const chatRoutes = require('./routes/chatRoutes')

//lunching the app
const app = express()

//midlware 
app.use(cors())
app.use(express.json())

//track the path and the method

app.use((req , res , next) => {

    console.log(req.method , req.path )
    next()
})

//Routes 
app.use('/api/user' , userRoutes)
app.use('/api/friend', friendRequestsRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/chats' , chatRoutes)

//connectin to the app and lunching it

mongoose.connect(process.env.MONGOURL)
.then(() => {

    app.listen(process.env.PORT , () => {

        console.log(`connecting on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})
