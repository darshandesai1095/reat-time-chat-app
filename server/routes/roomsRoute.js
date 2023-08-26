const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomsController')
const authorizationMiddleware = require('../middlewares/authorization')

// Route for creating a new room
router.post('/create/:userId', roomController.createNewRoom)

// Route for getting room
router.get('/:roomId', roomController.getRoom)

// Route for getting multiple rooms
router.get('/mongo/:userId', roomController.getRoomsByMongoDbUserId)

// Route for getting multiple rooms
router.get('/firebase/:firebaseUserId', roomController.getRoomsByFirebaseUserId)

// Route for adding user to room
router.patch('/addUsers/:roomId', roomController.addUsersToRoom)

// Route for removing user from room
router.patch('/removeUsers/:roomId', roomController.removeUsersFromRoom)

// Route for updating room name
router.patch('/:roomId', roomController.updateRoomName)

// Route for updating room icon
router.patch('/updateIcon/:roomId', roomController.updateRoomIcon)

// Route for deleting room for all users
router.delete('/:roomId', roomController.deleteRoom)

module.exports = router