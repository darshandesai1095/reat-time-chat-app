const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
require('dotenv').config()
const connectToDatabase = require("./config/connectToDatabse")

const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase()

// Include the users, rooms routes

// const usersRoute = require('./routes/usersRoute')
// app.use('/api/users', usersRoute)

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
    console.log(`${socket.id} connected`)

    socket.on("join", (data) => {
        socket.join(data.room)
    })

    socket.on("send", (data) => {
        socket.to(data.room).emit("receive", data)
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

module.exports = app


// http://localhost:8080/api/users/create

// {
//     "firebaseUserId": "id001",
//     "email": "email001@gmail.com",
//     "username": "username001",
//     "profilePictureUrl": "test_url_string"
// }
  