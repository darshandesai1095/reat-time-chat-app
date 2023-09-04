const User = require('../models/userModel')
const Room = require('../models/roomModel')
const firebaseAdmin = require('firebase-admin');
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
const { assignAvatarToUser } = require('./functions/assignAvatarToUser')
const { v4: uuidv4 } = require('uuid');



// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
})

const userController = {

    test: async (req,res) => {
        console.log("running test func...")
        res.status(400).send("it works")
    },

    // Controller for creating a new user
    createNewUser: async (req, res) => {
        try {
            // res.status(200).json("*** it works ***")
            // Get user data from the request body
            const { firebaseUserId, email, username } = req.body

            const profilePictureUrl = assignAvatarToUser(username)

            // Create a new user instance using the User model
            const newUser = new User({
                firebaseUserId,
                email,
                username,
                profilePictureUrl,
        })

        // Save the user to the database
        const savedUser = await newUser.save()

        // Respond with the saved user data
        res.status(201).json(savedUser)

        } catch (error) {
            res.status(500).json({ error: 'Error creating a new user ( ˘︹˘ )' })
        }
    },

    // Controller for getting user details by MongoDB _id
    getUserByMongoDBUserId: async (req, res) => {
        try {
            const userId = req.params.userId // Get the MongoDB _id from the request parameters
            // Query the database to find the user by MongoDB _id
            const user = await User.findById(userId)

            if (!user) {
                // If the user is not found, return a 404 status with a custom message
                return res.status(404).json({ error: 'User not found' })
            }

            // Return the user details in the response
            res.status(200).json(user)

            } catch (error) {
            // If there is an error, return a 500 status with a generic error message
            res.status(500).json({ error: 'Error fetching user details by MongoDB _id' })
            }
    },

    // Controller for getting user details by firebase uid
    getUserByFirebaseUserId: async (req, res) => {
        try {
            const firebaseUserId = req.params.firebaseUserId // Get the firebase uid from the request parameters

            // Query the database to find the user by MongoDB _id
            const user = await User.find({firebaseUserId})

            if (!user) {
                // If the user is not found, return a 404 status with a custom message
                return res.status(404).json({ error: 'User not found' })
            }

            // Return the user details in the response
            res.status(200).json(user)
        } catch (error) {
            // If there is an error, return a 500 status with a generic error message
            res.status(500).json({ error: 'Error fetching user details (◎ ◎)ゞ', message: error.message })
        }
    },

    // Controller for updating user details; username
    updateUsername: async (req,res) => {
        try {
            console.log("updating username...")
            // Get the MongoDB _id from the request parameters
            const _id = req.params.userId
            console.log("body...", req.body)
            // Query the database to find the user by MongoDB _id
            const user = await User.findById(_id)

            if (!user) {
                // If the user is not found, return a 404 status with a custom message
                return res.status(404).json({ error: 'User not found' })
            }

            // Get the new username the request body
            const { newUsername } = req.body

            const updatedUserDetails = await User.findByIdAndUpdate(
              _id, { username: newUsername }, {new: true}
            )

            res.status(200).json(updatedUserDetails)

        } catch (error) {
            // If there is an error, return a 500 status with a generic error message
            res.status(500).json({ error: `Error updating username (server), ${error.message}` })
        }

    },

    // Controller for updating user details; user profile picture
    updateUserProfilePicture: async (req,res) => {
        try {
            // Get the MongoDB _id from the request parameters
            const _id = req.params.userId

            // Query the database to find the user by MongoDB _id
            const user = await User.findById(_id)

            if (!user) {
                // If the user is not found, return a 404 status with a custom message
                return res.status(404).json({ error: 'User not found' })
            }

            // Get the new username the request body
            const  { updatedUserProfilePictureUrl } = req.body

            const updatedUserDetails = await User.findOneAndUpdate(
              {_id}, { profilePictureUrl: updatedUserProfilePictureUrl }, {new: true}
            )
            res.status(201).json(updatedUserDetails)

        } catch (error){
            // If there is an error, return a 500 status with a generic error message
            console.log(error)
            res.status(500).json({ error: 'Error updating profile picture' })
        }

    },

    // // Controller for updating user details; email
    // resetUserEmail: async (req,res) => {

    // },

    // Route for deleting a user
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId
      
            // Find the user by userId
            const user = await User.findById(userId)
        
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            // 2 Go through all user rooms and remove them from user list

            // 3 Clear user rooms array
            for (let roomId of user.rooms) {
                // find room, remove user
                await Room.findOneAndUpdate( 
                    { _id: roomId },  
                    { $pull: { users: user._id } },
                    { new: true }
                )
            }

            // 4 Delete user email form DB
            // 5 Change user status from activeUser = true -> false   
            // 6 Update profile pic to https://i.postimg.cc/63k0R0FB/image-k3qx3-O9-Dr-RZb.jpg
            await User.findByIdAndUpdate( userId, 
                { 
                    email: `deletedEmail_${uuidv4()}`,
                    profilePictureUrl: "https://i.postimg.cc/13JNx5YY/image-Ot-ILHw-Wp-NCPt.jpg", 
                    rooms: [],
                    activeUser: false,
                }, 
                { new: true } 
            )

            // CLEAR USER NOTIFICATIONS FROM REDIS

            // 1 Delete the user from Firebase authentication
            await firebaseAdmin.auth().deleteUser(user.firebaseUserId)
        
            // Return a success response
            res.status(200).json({ message: 'User deleted successfully' })

            } catch (error) {
                // Handle any errors that occurred during the process
                console.error(error)
                res.status(500).json({ error: 'Error deleting user' })
            }
    },

}

module.exports = userController