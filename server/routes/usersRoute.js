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

// Route for updating user details; username
router.patch('/updateUsername/:userId', userController.updateUsername)

// // Route for updating user details; email
// router.patch('/resetEmail/:userId', authorizationMiddleware, userController.updateUser)

// // Route for updating user details; pic
router.patch('/updateUserProfilePicture/:userId', userController.updateUserProfilePicture)

// Route for deleting a user
router.delete('/delete/:userId', userController.deleteUser)

router.get('/test/124', userController.test)

module.exports = router