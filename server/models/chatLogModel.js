const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },

    messages: [
        {
            messageId: {
                type: String,
                required: true,
            },

            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            username: {
                type: String
            },

            messageContent: {
                type: String,
                required: true,
            },

            dateCreated: {
                type: Date,
                default: Date.now,
                required: true
            },
        },
    ],
})

const ChatLog = mongoose.model('ChatLog', chatLogSchema)

module.exports = ChatLog
