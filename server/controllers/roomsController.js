const Room = require('../models/roomModel')
const User = require('../models/userModel')
const ChatLog = require('../models/chatLogModel')
const mongoose = require('mongoose')


const roomController = {

    createNewRoom: async (req, res) => {
        try {
            console.log("trying...")
            const userId = req.params.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
        
            const userEmail = user.email
            const { roomName, membersArray } = req.body

            // this deals with duplicates
            let membersEmailsArray = Array.from(new Set([userEmail, ...membersArray]))
        
            // Resolve all member emails to user IDs using Promise.all
            const memberIdPromises = membersEmailsArray.map( async (memberEmail) => {
                const user = await User.findOne({ email: memberEmail })
                return (user?._id.toString())
            })
            const memberIdArray = await Promise.all(memberIdPromises)
            const filteredMemberIdArray = memberIdArray.filter(user => ((user !== null) && (user !== undefined)))

            // Create a new array for unique user IDs
            const uniqueUsersArray = []

            // Add members to the uniqueUsersArray, excluding duplicates
            for (let memberId of filteredMemberIdArray) {
                if (!uniqueUsersArray.includes(memberId)) {
                    uniqueUsersArray.push(memberId)
                }
            }

            const uniqueUserIdsArray = Array.from(new Set(uniqueUsersArray));

            // Create new room instance using Room model
            const newRoom = new Room({
                roomName: roomName,
                users: [...uniqueUserIdsArray],
            })
    

            // Save the room to the database
            await newRoom.save()
            const roomId = newRoom._id.toString()
        
            // Update user rooms with the new room ID
            const usersToUpdate = [userEmail, ...membersArray]
            const userPromises = usersToUpdate.map(async (email) => {
                return (
                    await User.findOneAndUpdate({ email }, { $addToSet: { rooms: roomId } })
                )
            })
        
            // Execute all user update promises
            await Promise.all(userPromises)
        
            // Create new chatLog instance using ChatLog model
            const chatLog = new ChatLog({
                roomId: roomId,
            })
        
            // Save the chat log to the database
            await chatLog.save()

            const globalAlertData = {
                eventType: 'newRoomCreated',
                eventData: {
                    roomId: roomId,
                    createdBy: userId,
                    users: newRoom.users
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)
            console.log("new room created")
      
            // Respond with the saved user data
            res.status(201).json(newRoom)
            } catch (error) {
                console.log("create new group error", error.message)
                res.status(500).json({ error: 'Error creating a new room', message: error.message })
            }
    },  

    getRoom: async (req, res) => {
        try {
            // Get the room id from the request parameters
            const _id = req.params.roomId

            // Query the database to find the room
            const room = await Room.findById(_id)?.populate("users")

            if (!room) {
                return res.status(404).json({ error: 'Room not found'})
            }

            const formattedRoom = ({
                roomId: room._id,
                roomName: room.roomName,
                dateCreated: room.dateCreated,
                roomUsers: room.users?.map(user => {
                    return ({
                        userId: user._id,
                        firebaseUserId: user.firebaseUserId,
                        email: user.email,
                        username: user.username,
                    })
                }) || null,
            })

            res.status(200).json(formattedRoom)

        } catch {
            res.status(500).json({ error: 'Error fetching user room details' })
        }
    },

    getRoomsByMongoDbUserId:  async (req, res) => {
        try {
            const userId = req.params.userId

            const user = await User.findById(userId)
            const roomIdsArray = user.rooms.map(roomIdObj => roomIdObj.toString())

            const allRooms = []

            for (let roomId of roomIdsArray) {
                const room = await Room.findById(roomId)?.populate("users")
                if (!room) { 
                    continue 
                }
                allRooms.push({
                    roomId: room._id,
                    roomName: room.roomName,
                    dateCreated: room.dateCreated,
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            firebaseUserId: user.firebaseUserId,
                            email: user.email,
                            username: user.username,
                        })
                    }) || null,
                })
            }
            
            res.status(201).send(allRooms)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getRoomsByFirebaseUserId: async (req, res) => {
        try {
            const firebaseUserId = req.params.firebaseUserId

            const user = await User.findOne({firebaseUserId})
            const roomIdsArray = user.rooms.map(roomIdObj => roomIdObj.toString())

            const allRooms = []

            for (let roomId of roomIdsArray) {
                const room = await Room.findById(roomId)?.populate("users")
                if (!room) { 
                    continue 
                }
                allRooms.push({
                    roomId: room._id,
                    roomName: room.roomName,
                    dateCreated: room.dateCreated,
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            firebaseUserId: user.firebaseUserId,
                            email: user.email,
                            username: user.username,
                        })
                    }) || null,
                })
            }
            
            res.status(201).send(allRooms)

        } catch (error) {
            res.status(500).json({error: error.message})
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

            const userIdsArr = []
            for (let email of emailsArray) {
                const user = await User.findOne({ email: email })
                const userId = user._id
                if (!userId) {
                    continue
                }
                userIdsArr.push(userId)
    
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

            const globalAlertData = {
                eventType: 'usersAddedToRoom',
                eventData: {
                    roomId: room._id,
                    addedUsers: userIdsArr
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

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

            const removedUsersArr = []
            for (let email of emailsArray) {
                const user = await User.findOne({email})
                if (!user) {
                    continue
                }
                const userIdObj = user._id
                removedUsersArr.push(userIdObj.toString())
    
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

            const globalAlertData = {
                eventType: 'usersRemovedFromRoom',
                eventData: {
                    roomId: roomId,
                    users: removedUsersArr
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)
    
    
            res.status(201).json(room)

        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    },

    updateRoomName: async (req, res) => {
        try {
            const _id = req.params.roomId
            const newRoomName = req.body.newRoomName
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
            const roomIdObj = new mongoose.Types.ObjectId(roomId)

            const room = await Room.findById(roomId)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            await Room.findByIdAndDelete(roomId)
            await ChatLog.findOneAndDelete({ roomId })
            const users = room?.users
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


            const globalAlertData = {
                eventType: 'roomDeleted',
                eventData: {
                    roomId: roomId,
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

            res.status(200).json({ message: "Room deleted successfully" })

        } catch (error) {
            console.log("delete room error", error)
            res.status(500).json({ error: "Error deleting room" })
        }
    },
}

module.exports = roomController