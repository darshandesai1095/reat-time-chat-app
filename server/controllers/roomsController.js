const Room = require('../models/roomModel')
const User = require('../models/userModel')

const roomController = {
    createNewRoom: async (req, res) => {
        try {
            // Get room name from the request body
            const { roomName, usersArray } = req.body

            // Create new room instance using Room model
            const newRoom = new Room({
                roomName: roomName,
                users: usersArray
            })

            // Save the room to the database
            const savedRoom = await newRoom.save()
            // Respond with the saved user data
            res.status(201).json(savedRoom)
        } catch {
            res.status(500).json({ error: 'Error creating a new room' })
        }
    },

    getRoom: async (req, res) => {
        try {
            // Get the room id from the request parameters
            const roomId = req.params.roomId

            // Query the database to find the room
            const room = await Room.findById(roomId)

            if (!room) {
                return res.status(404).json({ error: 'Room not found'})
            }

            res.status(200).json(room)

        } catch {
            res.status(500).json({ error: 'Error fetching user room details' })
        }

    },

    addUserToRoom: async (req, res) => { // also update user document to include room
        try {
            const { roomId, email } = req.params

            const room = await Room.findById(roomId)
            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }

            const user = await User.findOne({ email: email })
            const userId = user.user_id
            if (!userId) {
                return res.status(404).json({ error: 'User not found' })
            }

            if ( room.users.includes(userId) ) {
                return res.status(409).json({ error: 'User already in room' })
            }

            if ( user.rooms.includes(roomId) ) {
                return res.status(409).json({ error: 'User already in room' })
            }

            user.rooms.push(roomId)
            await user.save()
            
            room.users.push(userId)
            await room.save()

            res.status(201).json(room.users)

        } catch {
            res.status(500).json({ error: 'Error adding user to room' })
        }
    },

    removeUserFromRoom: async (req, res) => { // also update user document to remove room
        try {
            const { roomId, email } = req.params

            const room = await Room.findById(roomId)
            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }

            const user = await User.findById({email})
            const userId = user.user_id
            if (!userId) {
                return res.status(404).json({ error: 'User not found' })
            }

            if ( !room.users.includes(userId) ) {
                return res.status(409).json({ error: 'User not in room' })
            }

            if ( !user.rooms.includes(roomId) ) {
                return res.status(409).json({ error: 'User not in room' })
            }

            const roomIndex = user.rooms.indexOf(roomId)
            user.rooms.splice(roomIndex, 1)
            await user.save()

            const userIndex = room.users.indexOf(userId)
            room.users.splice(userIndex, 1)
            await room.save()

            res.status(201).json(room.users)

        } catch {
            res.status(500).json({ error: 'Error removing user from room' })
        }
    },

    updateRoomName: async (req, res) => {
        try {
            const roomId = req.params.roomId
            const newRoomName = req.body.newRoomName

            if (!newRoomName || newRoomName.trim() === "") {
                return res.status(400).json({ error: "New room name not provided" })
            }

            const room = await Room.findById(roomId)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            room.roomName = newRoomName
            await room.save()

            res.status(201).json(room.roomName)

        } catch {
            res.status(500).json({ error: 'Error updating room name' })
        }
    },

    deleteRoom: async (req, res) => {
        try {
            const roomId = req.params.roomId

            const room = await Room.findById(roomId)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            await room.delete()
            res.status(200).json({ message: "Room deleted successfully" })

        } catch {
            res.status(500).json({ error: 'Error deleting room' })
        }
    },
}

module.exports = roomController