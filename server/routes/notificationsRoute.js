const express = require('express')
const router = express.Router()
const notificationsController = require('../controllers/notificationsController')

router.get('/getNotifications/:userId', notificationsController.getNotifications)

router.delete('/clearNotifications/:userId', notificationsController.clearNotifications)


module.exports = router