const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_id: mongoose.Schema.Types.ObjectId, // Unique identifier for the room
    roomName: {
        type: String,
        required: true,
    },
    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
});

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
