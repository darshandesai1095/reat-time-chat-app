const express = require('express')
const router = express.Router()
const chatLogController = require('../controllers/chatLogsController')
const authorizationMiddleware = require('../middlewares/authorization')


// route for updating chat log
router.patch('/updateChatLog/:roomId', chatLogController.updateChatLog)


// PATCH /updateChatLog/roomId123
// {
//   "chatLog": [
//     {
//       "sender": "userId456",
//       "message": "Hello there!",
//       "timestamp": "2023-07-19T12:00:00.000Z"
//     },
//     {
//       "sender": "userId789",
//       "message": "How are you?",
//       "timestamp": "2023-07-19T12:01:00.000Z"
//     }
//   ]
// }


// route for getting chat logs by roomId
router.get('/getChatLogs', chatLogController.getChatLogsByRoomsArray)

// route for getting chat logs by firebase user ID
router.get('/getChatLogsByFirebaseUserId/:firebaseUserId', chatLogController.getChatLogsByFirebaseUserId)

// route for getting chat logs by firebase user ID
router.get('/redisTest', chatLogController.redisTest)


module.exports = router