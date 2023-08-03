const ChatLog = require('../models/chatLogModel')
const Room = require('../models/roomModel')
const User = require('../models/userModel')

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
                const chatLog = await ChatLog.find({ roomId })
                allChats.push({
                    roomId: room._id,
                    roomName: room.roomName,
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            email: user.email,
                            username: user.username,
                        })
                        }) || null,
                    dateCreated: room.dateCreated,
                    messagesArray: "empty array" // chatLog.messages // convert messageSender to userName/email
                })
            }

            console.log(allChats)
            res.status(201).json(allChats)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getChatLogsByFirebaseUserId: async (req, res) => {
        try {
            const { firebaseUserId } = req.params

            const user = await User.find({firebaseUserId})
            const roomIdsArray = user[0].rooms.map(roomIdObj => roomIdObj.toString())
            console.log(user)

            const allChats = []

            for (let roomId of roomIdsArray) {
                const room = await Room.findById(roomId).populate("users")
                if (!room) { 
                    continue 
                }
                const chatLog = await ChatLog.find({ roomId })
                allChats.push({
                    roomId: room._id,
                    // roomName: room.roomName,
                    // roomUsers: room.users?.map(user => {
                    //     return ({
                    //         userId: user._id,
                    //         firebaseUserId: user.firebaseUserId,
                    //         email: user.email,
                    //         username: user.username,
                    //     })
                    //     }) || null,
                    messagesArray: chatLog.messages // convert messageSender to userName/email
                })
            }
            
            res.status(201).send(allChats)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = chatLogController