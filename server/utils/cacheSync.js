const { client } = require('../config/connectToRedis')
const ChatLog = require('../models/chatLogModel')
const schedule = require('node-schedule');



// roomid: [{message: {
//             messageId: messageData.message.messageId, // ✓ 
//             senderId: messageData.message.senderId, // ✓
//             username: messageData.message.username, // ✓
//             messageContent: messageData.message.messageContent, // ✓
//             dateCreated: messageData.message.dateCreated, // ✓
//         }, [], []}

// redis> HGETALL myhash
// 1) "field1" roomId
// 2) "Hello" { [],[],[],... }
// 3) "field2" roomId
// 4) "World" { [],[],[],... }

const cacheSync = () => {
    schedule.scheduleJob( '42 * * * * *' , () => { // '42 * * * *' => min 42
        console.log("scheduled function")
    })
}

cacheSync()

module.exports = {cacheSync}