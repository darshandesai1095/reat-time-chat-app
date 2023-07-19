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
        res.status(201).json(savedUser);
        } catch (error) {
        res.status(500).json({ error: 'Error creating a new user' })
        }
    },

    // Controller for getting user details by MongoDB _id
    getUserByMongoDBUserId: async (req, res) => {
        try {
        const userId = req.params.userId; // Get the MongoDB _id from the request parameters

        // Query the database to find the user by MongoDB _id
        const user = await User.findById(userId);

        if (!user) {
            // If the user is not found, return a 404 status with a custom message
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user details in the response
        res.status(200).json(user);
        } catch (error) {
        // If there is an error, return a 500 status with a generic error message
        res.status(500).json({ error: 'Error fetching user details' });
        }
    },

    // Controller for getting user details by firebase uid
    getUserByFirebaseUserId: async (req, res) => {
        try {
            const firebaseUserId = req.params.firebaseUserId; // Get the irebase uid from the request parameters

            // Query the database to find the user by MongoDB _id
            const user = await User.findById(firebaseUserId);

            if (!user) {
            // If the user is not found, return a 404 status with a custom message
            return res.status(404).json({ error: 'User not found' });
            }

            // Return the user details in the response
            res.status(200).json(user);
        } catch (error) {
            // If there is an error, return a 500 status with a generic error message
            res.status(500).json({ error: 'Error fetching user details' });
        }
    },

    // // Controller for updating user details; username, pic
    // updateUserDetails: async (req,res) => {

    // },

    // // Controller for updating user details; email
    // resetUserEmail: async (req,res) => {

    // },

    // Route for adding a user to a room (assuming the room already exists)
    addUserToRoom: async (req, res) => {
        try {
          const userId = req.params.userId
          const roomId = req.params.roomId
      
          // Check if both userId and roomId are valid ObjectIds
          if (!isValidObjectId(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' })
          }
          if (!isValidObjectId(roomId)) {
            return res.status(400).json({ error: 'Invalid room ID' })
          }
      
          // Find the user by userId
          const user = await User.findById(userId)
      
          // Check if the user exists
          if (!user) {
            return res.status(404).json({ error: 'User not found' })
          }
      
          // Rooms is an array in the User model
          // Check if the room is already added to the user's rooms
          if (user.rooms.includes(roomId)) {
            return res.status(400).json({ error: 'User already in the room' })
          }
      
          // Add the roomId to the user's rooms array
          user.rooms.push(roomId)
      
          // Save the updated user document
          await user.save()
      
          // Return success response
          res.status(200).json({ message: 'User added to the room successfully' })
        } catch (error) {
          // Handle any errors that occurred during the process
          console.error(error);
          res.status(500).json({ error: 'Error adding user to the room' })
        }
    },

    // Route for removing a user from a room (assuming the room already exists)
    removeUserFromRoom: async (req, res) => {
        try {
          const userId = req.params.userId
          const roomId = req.params.roomId
      
          // Check if both userId and roomId are valid ObjectIds
          if (!isValidObjectId(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' })
          }
          if (!isValidObjectId(roomId)) {
            return res.status(400).json({ error: 'Invalid room ID' })
          }
      
          // Find the user by userId
          const user = await User.findById(userId)
      
          // Check if the user exists
          if (!user) {
            return res.status(404).json({ error: 'User not found' })
          }
      
          // Rooms is an array in the User model
          // Check if the room is already added to the user's rooms
          if (!user.rooms.includes(roomId)) {
            return res.status(400).json({ error: 'User not in the room' })
          }
      
          // Remove the roomId to the user's rooms array
          const roomIndex = user.rooms.indexOf(roomId)
          user.rooms.splice(roomIndex, 1)
          user.save()
      
          // Save the updated user document
          await user.save()
      
          // Return success response
          res.status(200).json({ message: 'User removed to the room successfully' })
        } catch (error) {
          // Handle any errors that occurred during the process
          console.error(error);
          res.status(500).json({ error: 'Error adding user to the room' })
        }
    },

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
            await firebaseAdmin.auth().deleteUser(user.firebase_uid);

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