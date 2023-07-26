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
                type: mongoose.Schema.Types.ObjectId,
                default: mongoose.Types.ObjectId, // This generates a new unique ObjectId for each message
            },

            messageSender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            messageContent: {
                type: String,
                required: true,
            },

            messageCreated: {
                type: Date,
                default: Date.now,
                required: true
            },
        },
    ],
})

const ChatLog = mongoose.model('ChatLog', chatLogSchema)

module.exports = ChatLog
