const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    chatLog: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
    },
    ],
});

const ChatLog = mongoose.model('ChatLog', chatLogSchema)

module.exports = ChatLog
