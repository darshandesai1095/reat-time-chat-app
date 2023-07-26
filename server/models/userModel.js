const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUserId: {
        type: String, // Assuming Firebase UID is a string
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now, 
    },
    profilePictureUrl: {
        type: String,
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        },
    ],
    activeUser: {
        type: Boolean,
        required: true,
        default: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
