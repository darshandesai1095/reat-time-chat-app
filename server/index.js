const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const server = app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
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

