const ChatLog = require('../models/chatLogModel')
const Room = require('../models/roomModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const { client, hgetAsync, hsetAsync, connectToRedis  } = require('../config/connectToRedis')


const chatLogController = {

    updateChatLog: async (req,res) => {
        try {
            const _id = req.params.roomId
            const chatLogArray = req.body.chatLog // may just be a single entry [{}]
            const room = await Room.findById(_id)

            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }

            // mongoose.Types.ObjectId(roomId)

            const chatLog = await ChatLog.findOne({ roomId: _id })

            // Save each message to chat log asynchronously using for...of loop
            for (const message of chatLogArray) {
                const newMessage = {
                    messageSender: message.messageSender,
                    messageContent: message.messageContent,
                    messageCreated: message.messageCreated || new Date(),
                }

                // Add the new message to the chatLog's messages array
                chatLog.messages.push(newMessage)

                // Save the chat log after adding the new message
                await chatLog.save()
            }

            res.status(201).json(chatLog)

        } catch {
            res.status(500).json({ error: 'Error updating chat log' })
        }
    },

    getChatLogsByRoomsArray: async (req, res) => {
        try {
            const roomIdsArray = req.query.roomIdsArray
            const allChats = []

            for (let roomId of roomIdsArray) {
                const room = await Room.findById(roomId).populate("users")
                if (!room) { 
                    continue 
                }

                // get cached messages from redis
                const jsonMessageLog = await client.HGET('chatLogs', roomId)
                const cachedChats = jsonMessageLog ? JSON.parse(jsonMessageLog) : []
                // for each message in cached chats get sender id and populate chat {}
                // with sender username, profile pic,
                                
                const chatLog = await ChatLog.find({ roomId })
                allChats.push({
                    roomId: room._id,
                    roomName: room.roomName,
                    dateCreated: room.dateCreated ? room.dateCreated : 0,
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            email: user.email,
                            username: user.username,
                            
                        })
                        }) || null,
                    roomDeletedUsers: [],
                    messagesArray: [...chatLog[0].messages, ...cachedChats] || [] // convert messageSender to userName/email
                })
            }

            res.status(201).json(allChats)

        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message})
        }
    },

    getChatLogsByFirebaseUserId: async (req, res) => {
        try {
            const { firebaseUserId } = req.params

            const user = await User.find({firebaseUserId: firebaseUserId})
            const roomIdsArray = user[0].rooms.map(roomIdObj => roomIdObj.toString())

            const allChats = [] // mongo db (persistent) + redis (cached)

            for (let roomId of roomIdsArray) {

                const room = await Room.findById(roomId).populate("users")
                if (!room) { 
                    continue 
                }

                // get cached messages from redis
                const jsonMessageLog = await client.HGET('chatLogs', roomId)
                const cachedChats = jsonMessageLog ? JSON.parse(jsonMessageLog) : []


                const chatLog = await ChatLog.find({ roomId })
                allChats.push({
                    roomId: room._id,
                    roomName: room.roomName, // delete
                    dateCreated: room.dateCreated ? room.dateCreated : 0,
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            email: user.email,
                            username: user.username,
                        })
                        }) || null, // delete
                    // messagesArray: [
                    //     // {messageContent: room._id},
                    //     // {messageContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", messageSender: "user1"},
                    //     // {messageContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", messageSender: "user1"},
                    //     // {messageContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", messageSender: "user2"},
                    //     // {messageContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", messageSender: "user1"},
                    //     // {messageContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", messageSender: "user2"}
                    // ],
                    messagesArray: [...chatLog[0].messages, ...cachedChats] || [] // convert messageSender to userName/email
                })
            }

            res.status(201).send(allChats)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },


    redisTest: async (req, res) => {
        try {
            console.log("running test...")
            await client.HSET('userInfo', 'nombre2', 'bob')
            console.log("part 2...")
            const value = await client.HGET('userInfo', 'nombre2')
            console.log("nombre1...", value)
        
            res.status(201).json(value)

        } catch (error) {
            console.log("redis error", error.message)
            res.status(500).json({error: error.message})
        }
    }

}

module.exports = chatLogController