const { client } = require("../config/connectToRedis")

const saveGlobalAlertToRedis = async (data, userIdsArray, ignore) => {
    try {
        for (let userId of userIdsArray) {  
            if (userId == ignore.toString()) { continue }
            const jsonMessageLog = await client.HGET('globalAlerts', userId.toString())
            const messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []
            await client.HSET('globalAlerts', userId.toString(), JSON.stringify([ ...messageLog, data ]))
        }
    } catch (error) {
        console.log("saveGlobalAlertToRedis error", error)
    }
}

module.exports = { saveGlobalAlertToRedis }