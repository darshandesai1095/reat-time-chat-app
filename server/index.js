const express = require("express")
const cors = require("cors")
const { connectToDatabase  }= require("./config/connectToDatabse")
require('dotenv').config()
const { Server } = require("socket.io")
const { connectToRedis, client } = require('./config/connectToRedis')
const { socket } = require('./utils/socketIO')
const { syncCache } = require('./utils/syncCache')


const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase().then(async () => syncCache())

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

const PORT = process.env.PORT || 10000 // https://boisterous-sunburst-f3d32f.netlify.app/
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const io = new Server(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://boisterous-sunburst-f3d32f.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

connectToRedis().then(() => { socket(io) }) 

// Enable CORS for specific routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// Pass 'io' object to the relevant parts of application
app.use((req, res, next) => {
    req.io = io
    req.redisClient = client
    next()
})

// Include the users, rooms routes


const usersRoute = require('./routes/usersRoute')
app.use('/api/users', usersRoute)

const roomsRoute = require('./routes/roomsRoute')
app.use('/api/rooms', roomsRoute)

const chatLogsRoute = require('./routes/chatLogsRoute')
app.use('/api/chatLogs', chatLogsRoute)

const notificationsRoute = require('./routes/notificationsRoute')
app.use('/api/notifications', notificationsRoute)

const testRoute = require('./routes/testRoute')
app.use('/api/tests', testRoute)

module.exports = { app, server }