const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomsController')
const authorizationMiddleware = require('../middlewares/authorization')

// Route for creating a new room
router.post('./create', roomController.createNewRoom)

// Route for getting room
router.get('./:roomId', roomController.getRoom)

// Route for adding user to room
router.put('./addUser/:userId/:roomId', roomController.addUserToRoom)

// Route for removing user from room
router.put('./removeUser/:userId/:roomId', roomController.removeUserFromRoom)

// Route for updating room name
router.put('./:roomId', roomController.updateRoomName)

// Route for deleting room
router.delete('./:roomId', roomController.deleteRoom)
