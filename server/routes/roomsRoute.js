const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomsController')
const authorizationMiddleware = require('../middlewares/authorization')

// Route for creating a new room
router.post('/create/:userId', roomController.createNewRoom)

// Route for getting room
router.get('/:roomId', roomController.getRoom)

// Route for adding user to room
router.patch('/addUser/:roomId', roomController.addUserToRoom)

// Route for removing user from room
router.patch('/removeUser/:roomId', roomController.removeUserFromRoom)

// Route for updating room name
router.patch('/:roomId', roomController.updateRoomName)

// Route for deleting room for all users
router.delete('/:roomId', roomController.deleteRoom)

module.exports = router