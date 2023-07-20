const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId, // Primary identifier ObjectId
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
    profilePictureUrl: {
        type: String,
      },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        },
    ],
})

const User = mongoose.model('User', userSchema)

module.exports = User