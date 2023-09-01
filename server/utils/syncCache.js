const { client } = require('../config/connectToRedis')
const { connectToDatabase } = require('../config/connectToDatabse')
const ChatLog = require('../models/chatLogModel')
const schedule = require('node-schedule');
const mongoose = require('mongoose')

// roomid: [{message: {
//             messageId: messageData.message.messageId, // ✓ 
//             senderId: messageData.message.senderId, // ✓
//             username: messageData.message.username, // ✓
//             messageContent: messageData.message.messageContent, // ✓
//             dateCreated: messageData.message.dateCreated, // ✓
//         }, [], []}


const populateWithDummyData = async () => {
    const rooms = ['64d28a490d7d73d84d450864']

    for (let i=0; i<=100; i++) {
        const message = {
            messageId: Math.random(),
            senderId: '64c6a091dd39eb12498bc66f',
            username: 'darshan1',
            messageContent: `test message ${i}`,
            dateCreated: new Date().now,
        }

        await client.HSET('chatLog', `user_${i}`, `name_${i}`)
    }
}

const syncCache = async () => {
    console.log("syncing data...")
    
    // sync cache at 00:00 everyday
    // e.g. '42 * * * *' => min 42
    schedule.scheduleJob( '0 0 * * *' , async () => { 
        try {
            let cursorVal = 0
            do {
                const { cursor: nextCursor, tuples: fieldValueTuples }  = await client.HSCAN('chatLogs', cursorVal)
                console.log(nextCursor, fieldValueTuples)
                cursorVal = nextCursor

                for (let fieldValueTuple of fieldValueTuples) {

                    const roomId = fieldValueTuple.field
                    let cachedMessagesArray = JSON.parse(fieldValueTuple.value)

                    const roomIdObj = new mongoose.Types.ObjectId(roomId)
                    const chatLog = await ChatLog.findOne({ roomId: roomIdObj })
                    if (!chatLog) {
                        console.log(`chat log ${roomId} not found`)
                        continue
                    }

                    chatLog.messages = [...chatLog.messages, ...cachedMessagesArray]
                    await chatLog.save()

                }

            } while (cursorVal !== 0)
            await client.FLUSHALL()
        } catch (error) {
            console.log(error)
        }
    }
)}

module.exports = { syncCache }