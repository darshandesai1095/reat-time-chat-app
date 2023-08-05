const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
const connectToDatabase = require("./config/connectToDatabse")
const { client, connectRedis } = require('./config/connectRedis')
const { v4: uuidv4 } = require('uuid')
const { format } = require('date-fns')
require('dotenv').config()


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
  
// io.on("connection", (socket) => {
//     console.log(`socket.io ID: ${socket.id} connected to server, ${new Date()}`)

//     socket.on("join", (data) => {
//         socket.join(data.room)
//         console.log(`joined room ${data.room}`)
//     })

//     socket.on("response", (data) => {
//         socket.to(data.room).emit("receive", data)
//     })

//     socket.on("disconnect", () => {
//         console.log(`${socket.id} disconnected`)
//     })
// })


const socket = () => {
    io.on('connection', (socket) => {
        console.log(`socket.io ID: ${socket.id} connected to server`)

        socket.on('login', (userData) => {
            userData.rooms.forEach(roomId => socket.join(roomId))
        })

        socket.on('sendMessage', async (messageData, acknowledgment) => { 

            // messageData = { roomId, senderId, username, messageContent }
            console.log("new message: ", messageData)

            // set meta data for message
            const messageId = uuidv4()
            const date = new Date()
            const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss')

            console.log("*2")
            // get previous messages from redis and append new message
            try {
                console.log("starting hget")
                const jsonMessageLog = await client.HGET('chatLogs', messageData.roomId)
                const messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []
                console.log("hget done", "log", messageLog)

                const currentMessage = {
                    messageId: messageId,
                    roomId: messageData.roomId,
                    senderId: messageData.senderId,
                    username: messageData.username,
                    messageContent: messageData.messageContent,
                    dateCreated: formattedDate
                }

                // save to redis
                console.log("starting hset")
                await client.HSET('chatLogs', messageData.roomId, JSON.stringify([...messageLog, currentMessage]))
                console.log("hset done")

                // callback sent to sender
                const response = {
                    success: true,
                    data: currentMessage
                }
                acknowledgment(response)

                // send message to rest of room 
                // messageData = { roomId, { messageId, senderId, messageContent, dateCreated} }
                // senderId: mapped to -> userId, firebaseUserId, email, username
                io.to(messageData.roomId).emit('message', messageData)

            } catch (error) {
                console.log("Redis error", error)
            }
        })

        socket.on('disconnect', () => {
            delete socket.id
        })
    })
}

connectRedis().then(socket())

module.exports = { app }