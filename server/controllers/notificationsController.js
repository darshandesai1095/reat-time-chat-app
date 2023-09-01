const { client } = require("../config/connectToRedis")


const notificationsController = {

    getNotifications: async (req, res) => {
        try {
            const { userId } = req.params
            const jsonMessageLog = await client.HGET('globalAlerts', userId)
            const messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []
            res.status(201).json(messageLog)
        } catch (error) {
            console.log("error getting notifications log", error.message)
            res.status(500).json({ error: 'error getting notifications log', message: error.message })
        }
    },

    clearNotifications: async (req, res) => {
        try {
            console.log('clearing notifications...')
            const { userId } = req.params
            await client.HDEL('globalAlerts', userId)
            console.log('notifications cleared')
            res.sendStatus(204)
        } catch (error) {
            console.log("error clearing user notifications", error.message)
            res.status(500).json({ error: 'error getting notifications log', message: error.message })
        }
    }

}

module.exports = notificationsController