const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const authorizationMiddleware = require('../middlewares/authorization')

// Route for creating a new user
router.post('/create', userController.createNewUser)

// Route for logging in (already have a separate authentication mechanism via firebase)
// router.post('/login', userController.loginUser);

// Route for getting user details by user ID (Retrieve a user by their MONGO _id)
router.get('/:userId', userController.getUserByMongoDBUserId)

// Route for getting user details by Firebase UID
router.get('/firebase/:firebaseUserId', userController.getUserByFirebaseUserId)



// // Route for updating user details; username
// router.put('/resetUsername/:userId', authorizationMiddleware, userController.updateUser)

// // Route for updating user details; email
// router.put('/resetEmail/:userId', authorizationMiddleware, userController.updateUser)

// // Route for updating user details; pic
// router.put('updateProfilePicture/:userId', authorizationMiddleware, userController.updateUser)



// Route for adding a user to a room (assuming the room already exists)
router.put('/:userId/rooms/:roomId', userController.addUserToRoom)

// Route for removing a user to a room
router.put('/:userId/rooms/:roomId', userController.removeUserFromRoom)

// Route for deleting a user
router.delete('/:userId', userController.deleteUser)

module.exports = router
