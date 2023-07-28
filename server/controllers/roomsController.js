const Room = require('../models/roomModel')
const User = require('../models/userModel')
const ChatLog = require('../models/chatLogModel')


const roomController = {

    createNewRoom: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
        
            const userEmail = user.email
            const { roomName, membersArray } = req.body

            let membersEmailsArray = Array.from(new Set([userEmail, ...membersArray]))
        
            // Resolve all member emails to user IDs using Promise.all
            const memberIdPromises = membersEmailsArray.map( async (memberEmail) => {
                const user = await User.findOne({ email: memberEmail })
                return (user._id)
            })
            const memberIdArray = await Promise.all(memberIdPromises)



            // Create a new array for unique user IDs
            const uniqueUsersArray = []

            // Add members to the uniqueUsersArray, excluding duplicates
            for (const memberId of memberIdArray) {
                if (!uniqueUsersArray.includes(memberId)) {
                    uniqueUsersArray.push(memberId)
                }
            }

            // Create new room instance using Room model
            const newRoom = new Room({
                roomName: roomName,
                users: uniqueUsersArray,
            })
        
            // Save the room to the database
            await newRoom.save()
            const roomId = newRoom._id
        
            // Update user rooms with the new room ID
            const usersToUpdate = [userEmail, ...membersArray]
            const userPromises = usersToUpdate.map((email) => User.findOneAndUpdate({ email }, { $addToSet: { rooms: roomId } }))
        
            // Execute all user update promises
            await Promise.all(userPromises)
        
            // Create new chatLog instance using ChatLog model
            const chatLog = new ChatLog({
                roomId: roomId,
            })
        
            // Save the chat log to the database
            await chatLog.save()
      
            // Respond with the saved user data
            res.status(201).json(newRoom)
            } catch (error) {
                res.status(500).json({ error: 'Error creating a new room', message: error.message })
            }
    },  

    getRoom: async (req, res) => {
        try {
            // Get the room id from the request parameters
            const _id = req.params.roomId

            // Query the database to find the room
            const room = await Room.findById(_id)

            if (!room) {
                return res.status(404).json({ error: 'Room not found'})
            }

            res.status(200).json(room)

        } catch {
            res.status(500).json({ error: 'Error fetching user room details' })
        }

    },

    addUsersToRoom: async (req, res) => { // also update user document to include room
        try {

            const _id = req.params.roomId
            const { emailsArray } = req.body

            const room = await Room.findById(_id)
            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }

            for (let email of emailsArray) {
                const user = await User.findOne({ email: email })
                const userId = user._id
                if (!userId) {
                    continue
                }
    
                if ( room.users.includes(userId) ) {
                    continue
                }
    
                if ( user.rooms.includes(_id) ) {
                    continue
                }
    
                user.rooms.push(_id)
                await user.save()
                
                room.users.push(userId)
                await room.save()
            }

            res.status(201).json(room.users)

        } catch {
            res.status(500).json({ error: 'Error adding user to room' })
        }
    },

    removeUsersFromRoom: async (req, res) => { // also update user document to remove room
        try {
            const roomId = req.params.roomId
            const { emailsArray } = req.body

            const room = await Room.findById(roomId)
            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }
            const roomIdObj = room._id

            for (let email of emailsArray) {
                const user = await User.findOne({email})
                if (!user) {
                    continue
                }
                const userIdObj = user._id
    
                await Room.findOneAndUpdate( 
                    { _id: roomIdObj },  
                    { $pull: { users: userIdObj } },
                    { new: true }
                )
    
                await User.findOneAndUpdate( 
                    { _id: userIdObj },  
                    { $pull: { rooms: roomIdObj } },
                    { new: true }
                )
            }
    
            res.status(201).json(room)

        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    },

    updateRoomName: async (req, res) => {
        try {
            const _id = req.params.roomId
            const newRoomName = req.body.newRoomName

            if (!newRoomName || newRoomName.trim() === "") {
                return res.status(400).json({ error: "New room name not provided" })
            }

            const room = await Room.findById(_id)
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
            const roomIdObj = mongoose.Types.ObjectId(roomId);

            const room = await Room.findById(roomId)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            await Room.findByIdAndDelete(roomId)
            res.status(200).json({ message: "Room deleted successfully" })

            await ChatLog.findOneAndDelete({ roomId })
            res.status(200).json({ message: "Room deleted successfully" })

            const users = room.users
            const userPromisesArray = users.map( async (user) => {
                return (
                    User.findOneAndUpdate( 
                        { _id: user._id },  
                        { $pull: { rooms: roomIdObj } },
                        { new: true }
                    )
                )
            })

            await Promise.all(userPromisesArray)



        } catch (error) {
            res.status(500).json({ error: "Error deleting room" })
        }
    },
}

module.exports = roomController