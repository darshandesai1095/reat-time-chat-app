const Room = require('../models/roomModel')
const User = require('../models/userModel')
const ChatLog = require('../models/chatLogModel')
const mongoose = require('mongoose')
const { assignAvatarToUser } = require('./functions/assignAvatarToUser')
const { v4: uuidv4 } = require('uuid');
const { saveGlobalAlertToRedis } = require('../utils/saveGlobalAlertToRedis')



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

            const uniqueUserIdsArray = Array.from(new Set(uniqueUsersArray))

            const profilePictureUrl = assignAvatarToUser(roomName)

            // Create new room instance using Room model
            const newRoom = new Room({
                roomName: roomName,
                users: [...uniqueUserIdsArray],
                profilePictureUrl: profilePictureUrl
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
                transmissionID: uuidv4(),
                eventType: 'newRoomCreated',
                eventData: {
                    roomId: roomId,
                    createdBy: userId,
                    users: newRoom.users,
                    roomName: roomName,
                    createdByUsername: user.username
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

            const date = Date.now()
            const globalAlertDataRedis = {
                transmissionID: globalAlertData.transmissionID,
                alertTitle: 'New Group Created',
                alertTime: date,
                alertInfo: {
                    roomName: roomName,
                    createdByUsername: user.username
                }
            }

            await saveGlobalAlertToRedis(globalAlertDataRedis, newRoom.users, userId)

      
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
                profilePictureUrl: room.profilePictureUrl ? room.profilePictureUrl : "https://i.postimg.cc/4dKcQkP2/image-ZNbbd-DZmd-PCt.jpg",
                roomUsers: room.users?.map(user => {
                    return ({
                        userId: user._id,
                        firebaseUserId: user.firebaseUserId,
                        email: user.email,
                        username: user.username,
                        profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : null
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
                    profilePictureUrl: room.profilePictureUrl ? room.profilePictureUrl : "https://i.postimg.cc/4dKcQkP2/image-ZNbbd-DZmd-PCt.jpg",
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            firebaseUserId: user.firebaseUserId,
                            email: user.email,
                            username: user.username,
                            profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : null,
                            activeUser: user.activeUser
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
                    profilePictureUrl: room.profilePictureUrl ? room.profilePictureUrl : "https://i.postimg.cc/4dKcQkP2/image-ZNbbd-DZmd-PCt.jpg",
                    roomUsers: room.users?.map(user => {
                        return ({
                            userId: user._id,
                            firebaseUserId: user.firebaseUserId,
                            email: user.email,
                            username: user.username,
                            profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : null,
                            activeUser: user.activeUser
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
            const { emailsArray, updatedById, updatedByUsername } = req.body

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

                /////////////////////////////////////////////
                /////////////////////////////////////////////
                /////////////////////////////////////////////
                // if ( room.deletedUsers?.includes(userId) ) {
                //     // remove from deleted users
                //     await Room.findOneAndUpdate( 
                //         { _id: _id },  
                //         { $pull: { deletedUsers: user._id } },
                //         { new: true }
                //     )
                // }
                /////////////////////////////////////////////
                /////////////////////////////////////////////
                /////////////////////////////////////////////
    
                if ( user.rooms.includes(_id) ) {
                    continue
                }
    
                user.rooms.push(_id)
                await user.save()
                
                room.users.push(userId)
                await room.save()
            }


            const globalAlertData = {
                transmissionID: uuidv4(),
                eventType: 'usersAddedToRoom',
                eventData: {
                    roomId: room._id,
                    addedUsers: userIdsArr,
                    roomName: room.roomName,
                    updatedById: updatedById,
                    updatedByUsername: updatedByUsername
                }
            }

            // send to all clients
            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

            const date = Date.now()
            const globalAlertDataRedis = {
                transmissionID: globalAlertData.transmissionID,
                alertTitle: 'User Added To Group',
                alertTime: date,
                alertInfo: {
                    roomName: room.roomName,
                    updatedByUsername: updatedByUsername
                }
            }

            await saveGlobalAlertToRedis(globalAlertDataRedis, userIdsArr, updatedById)


            res.status(201).json(room.users)

        } catch (error) {
            res.status(500).json({ error: 'Error adding user to room' })
        }
    },

    removeUsersFromRoom: async (req, res) => { // also update user document to remove room
        try {

            console.log("leaving room...", req.body)
            const roomId = req.params.roomId
            const { emailsArray, updatedById, updatedByUsername } = req.body

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

                /////////////////////////////////////////////
                /////////////////////////////////////////////
                /////////////////////////////////////////////
                // await Room.findOneAndUpdate(
                //     { _id: roomId },
                //     { $push: { deletedUsers: userIdObj } },
                //     { new: true }
                // )
                /////////////////////////////////////////////
                /////////////////////////////////////////////
                /////////////////////////////////////////////
    
                await User.findOneAndUpdate( 
                    { _id: userIdObj },  
                    { $pull: { rooms: roomIdObj } },
                    { new: true }
                )
            }

            const globalAlertData = {
                transmissionID: uuidv4(),
                eventType: 'usersRemovedFromRoom',
                eventData: {
                    roomId: room._id,
                    addedUsers: removedUsersArr,
                    roomName: room.roomName,
                    updatedById: updatedById,
                    updatedByUsername: updatedByUsername
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)


            const date = Date.now()
            const globalAlertDataRedis = {
                transmissionID: globalAlertData.transmissionID,
                alertTitle: 'User Removed From Group',
                alertTime: date,
                alertInfo: {
                    roomName: room.roomName,
                    updatedByUsername: updatedByUsername
                }
            }

            if (!removedUsersArr.includes(updatedById)) {
                await saveGlobalAlertToRedis(globalAlertDataRedis, removedUsersArr, updatedById)
            }

            console.log("done")
            res.status(201).json(room)

        } catch (error) {
            console.log("remove user error", error)
            res.status(500).json({ error: error.message})
        }
    },

    updateRoomName: async (req, res) => {
        try {
            const _id = req.params.roomId
            const { originalRoomName, newRoomName, updatedById, updatedByUsername } = req.body
            const room = await Room.findById(_id)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            room.roomName = newRoomName
            await room.save()
            
            const globalAlertData = {
                transmissionID: uuidv4(),
                eventType: 'roomNameUpdated',
                eventData: {
                    roomId: room._id,
                    users: room.users,
                    originalRoomName: originalRoomName,
                    roomName: newRoomName,
                    updatedById: updatedById,
                    updatedByUsername: updatedByUsername
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

            const date = Date.now()
            const globalAlertDataRedis = {
                transmissionID: globalAlertData.transmissionID,
                alertTitle: 'Group Name Updated',
                alertTime: date,
                alertInfo: {
                    originalRoomName: originalRoomName,
                    roomName: newRoomName,
                    updatedByUsername: updatedByUsername
                }
            }

            await saveGlobalAlertToRedis(globalAlertDataRedis, room.users, updatedById)


            res.status(201).json(room.roomName)

        } catch (error) {
            res.status(500).json({ error: 'Error updating room name', message: error.message })
        }
    },

    updateRoomIcon: async (req, res) => {
        try {
            const _id = req.params.roomId
            const newRoomIconUrl = req.body.newRoomIconUrl
            console.log("newRoomIconUrl...", newRoomIconUrl, _id)
            const room = await Room.findById(_id)
            if (!room) {
                res.status(404).json({ error: "Room not found" })
            }

            room.profilePictureUrl = newRoomIconUrl
            await room.save()

            res.status(201).json(room.profilePictureUrl)

        } catch {
            res.status(500).json({ error: 'Error updating room icon' })
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

            const usersArray = room.users.toString()

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


            const {username, deletedBy} = req.body
            const globalAlertData = {
                transmissionID: uuidv4(),
                eventType: 'roomDeleted',
                eventData: {
                    roomId: roomId,
                    roomName: room.roomName,
                    deletedBy: deletedBy,
                    deletedByUsername: username
                }
            }

            const io = req.io
            io.to("globalChannel").emit('globalAlert', globalAlertData)

            const date = Date.now()
            const globalAlertDataRedis = {
                transmissionID: globalAlertData.transmissionID,
                alertTitle: 'Group Deleted',
                alertTime: date,
                alertInfo: {
                    roomName: room.roomName,
                    deletedBy: username
                }
            }

            await saveGlobalAlertToRedis(globalAlertDataRedis, usersArray, deletedBy)

            res.status(200).json({ message: "Room deleted successfully" })

        } catch (error) {
            console.log("delete room error", error)
            res.status(500).json({ error: "Error deleting room" })
        }
    },
}

module.exports = roomController