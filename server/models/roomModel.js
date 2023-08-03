const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
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
    
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now, 
    },

})


const Room = mongoose.model('Room', roomSchema)

module.exports = Room
