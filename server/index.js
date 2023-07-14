const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const server = app.listen(3001, () => {
    console.log(`Server listening on port 3001`)
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
  
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)

    socket.on("fromClient", (data) => {
        console.log("MESSAGE: ", data.message, "\n", "ROOM: ", data.room)
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

