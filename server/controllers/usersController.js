const User = require('../models/userModel')
const firebaseAdmin = require('firebase-admin');
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
})

const userController = {
    // Controller for creating a new user
    createNewUser: async (req, res) => {
        try {
            // Get user data from the request body
            const { firebaseUserId, email, username, profilePictureUrl } = req.body

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
          res.status(500).json({ error: 'Error fetching user details' })
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
            res.status(500).json({ error: 'Error fetching user details (◎ ◎)ゞ' })
        }
    },

    // Controller for updating user details; username
    updateUsername: async (req,res) => {
        try {
            // Get the MongoDB _id from the request parameters
            const userId = req.params.userId

            // Query the database to find the user by MongoDB _id
            const user = await User.findById(userId)

            if (!user) {
                // If the user is not found, return a 404 status with a custom message
                return res.status(404).json({ error: 'User not found' })
            }

            // Get the new username the request body
            const { newUsername } = req.body

            const updatedUserDetails = await User.findByIdAndUpdate(
              userId, { username: newUsername }, {new: true}
            )
            res.status(201).json(updatedUserDetails)

        } catch {
            // If there is an error, return a 500 status with a generic error message
            res.status(500).json({ error: 'Error fetching user details' })
        }

    },

    // // Controller for updating user details; email
    // resetUserEmail: async (req,res) => {

    // },

    // Route for deleting a user
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId
        
            // Check if the userId is a valid ObjectId
            if (!isValidObjectId(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' })
            }
      
            // Find the user by userId
            const user = await User.findById(userId)
        
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            // First, delete the user from Firebase authentication
            await firebaseAdmin.auth().deleteUser(user.firebaseUserId);

            // Delete the user from the database
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
              return res.status(404).json({ error: 'User not found' });
            }
        
            // Return a success response
            res.status(200).json({ message: 'User deleted successfully' })
            } catch (error) {
            // Handle any errors that occurred during the process
            console.error(error);
            res.status(500).json({ error: 'Error deleting user' })
            }
    },

}

module.exports = userController