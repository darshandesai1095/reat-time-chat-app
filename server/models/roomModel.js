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
            unique: true,
        },
    ],
    
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now, 
    },

})

// // Middleware to ensure uniqueness of users in the room before saving
// roomSchema.pre('save', async function (next) {
//     // Remove duplicates from the users array
//     this.users = [...new Set(this.users)]
  
//     // Proceed to save
//     next()
// })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
