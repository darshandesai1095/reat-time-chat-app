const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
require('dotenv').config()
const connectToDatabase = require("./config/connectToDatabse")

const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase()

// Include the users route
const usersRoute = require('./routes/usersRoute');
app.use('/api/users', usersRoute);


const PORT = process.env.PORT || 5000
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