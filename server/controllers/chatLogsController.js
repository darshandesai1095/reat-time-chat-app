const ChatLog = require('../models/chatLogModel')
const Room = require('../models/roomModel')

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
    }
}

module.exports = chatLogController