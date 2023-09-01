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

    deletedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],

    profilePictureUrl: {
        type: String,
        default: "https://i.postimg.cc/R0hJv5kC/image-GESWSPGZJtkl.jpg"
    },
    
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now, 
    },

})


const Room = mongoose.model('Room', roomSchema)

module.exports = Room
