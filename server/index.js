const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
const connectToDatabase = require("./config/connectToDatabse")
const redis = require("redis")
const { v4: uuidv4 } = require('uuid')
const { format } = require('date-fns')
require('dotenv').config()


const client = redis.createClient()
client.on('error', (error) => console.log('Redis Client Error', error))
client.connect()


const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase()

// const allowedOrigins = ['http://example.com', 'http://localhost:3000'];
// app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     },
// }))

// Include the users, rooms routes

const usersRoute = require('./routes/usersRoute')
app.use('/api/users', usersRoute)

const roomsRoute = require('./routes/roomsRoute')
app.use('/api/rooms', roomsRoute)

const chatLogsRoute = require('./routes/chatLogsRoute')
app.use('/api/chatLogs', chatLogsRoute)



const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
  
io.on("connection", (socket) => {
    console.log(`socket.io ID: ${socket.id} connected to server, ${new Date()}`)

    socket.on("join", (data) => {
        socket.join(data.room)
        console.log(`joined room ${data.room}`)
    })

    socket.on("response", (data) => {
        socket.to(data.room).emit("receive", data)
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})



io.on('connection', (socket) => {

    socket.on('login', (userData) => {
        userData.rooms.forEach(roomId => socket.join(roomId))
    })

    socket.on('sendMessage', (messageData) => { 
        // messageData = { roomId, senderId, username, messageContent }
        console.log("new message: ", messageData)

        // send confirmation to sender -> once confirmation recieved update redux store
        const messageId = uuidv4()
        const date = new Date()
        const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss')
        socket.emit('messageSent', { messageSent: true, uuid: messageId, date: formattedDate })

        // get previous messages from redis and append new message
        let messageLog
        client.HGET('chatLogs', messageData.roomId, (error, jsonMessageLog) => {
            if (error) {
                console.log(`Error getting messages from Redis:`, error)
            } else {
                messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []
            }
        })

        // save to redis
        const currentMessage = {
            messageId: messageId,
            senderId: senderId,
            username: username,
            messageContent: messageContent,
            dateCreated: formattedDate
        }

        client.HSET('chatLogs', messageData.roomId, JSON.stringify([...messageLog, currentMessage]))

        // send message to rest of room 
        // messageData = { roomId, { messageId, senderId, messageContent, dateCreated} }
        // senderId: mapped to -> userId, firebaseUserId, email, username
        io.to(messageData.roomId).emit('message', messageData)
    })

    socket.on('disconnect', () => {
        deleteUser(socket.id)
    })
})

const interval = setInterval(() => console.log("running"), 1000)


  

module.exports = { app, client }