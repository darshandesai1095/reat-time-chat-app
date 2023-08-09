const { client } = require('../config/connectToRedis')


const socket = (IO) => {
    console.log("socket running")
    IO.on('connection', (socket) => {
        console.log(`socket.io ID: ${socket.id} connected to server...`)

        socket.on('joinRooms', async (roomsArray, acknowledgment) => {
            console.log("joining rooms")
            if (roomsArray) {
                try {
                    roomsArray.forEach(roomId => socket.join(roomId))
                    const response = { success: true }
                    acknowledgment(response)
                } catch (error) {
                    console.log("join rooms error", error)
                }
                console.log("SOCKET", socket.rooms)
            }
        })

        socket.on('sendMessage', async (messageData, acknowledgment) => { 
            console.log("message recieved", messageData)

            // messageData = { roomId, senderId, username, messageContent, dateCreated }

            // get previous messages from redis and append new message
            try {
                const jsonMessageLog = await client.hGet('chatLogs', messageData.roomId)
                const messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []

                // const currentMessage = {
                //     messageId: messageId, // ✓
                //     roomId: messageData.roomId, // ✗
                //     senderId: messageData.senderId, // ✓
                //     username: messageData.username, // ✓
                //     messageContent: messageData.messageContent, // ✓
                //     dateCreated: messageData.dateCreated, // ✓
                //     status: "sent" // ✗
                // }

                const currentMessage = {
                    roomId: messageData.roomId,
                    message: {
                        messageId: messageData.message.messageId, // ✓ 
                        senderId: messageData.message.senderId, // ✓
                        username: messageData.message.username, // ✓
                        messageContent: messageData.message.messageContent, // ✓
                        dateCreated: messageData.message.dateCreated, // ✓
                    }
                }

                // save to redis
                await client.HSET('chatLogs', messageData.roomId, JSON.stringify([...messageLog, currentMessage.message]))

                // callback sent to sender
                const response = {
                    success: true, // client: if success===true -> deliveryStatus->"sent"
                    data: currentMessage
                }
                acknowledgment(response)

                // send message to rest of room 
                // messageData = { roomId, { messageId, senderId, messageContent, dateCreated} }
                // senderId: mapped to -> userId, firebaseUserId, email, username
                socket.to(messageData.roomId).emit('message', currentMessage)

            } catch (error) {
                console.log("Redis error", error)
            }
        })

        socket.on('disconnect', () => {
            delete socket.id
        })
    })
}

module.exports = { socket }