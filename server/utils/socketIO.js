const { client } = require('../config/connectToRedis')

const socket = (IO) => {
    console.log("socket running")
    IO.on('connection', (socket) => {
        console.log(`socket.io ID: ${socket.id} connected to server...`)

        setInterval(() => socket.emit('ping', {beat: 1}), 30_000)
        socket.on('pong', () => {
            console.log("Pong received from client")
        })

        socket.on('joinRooms', async (roomsArray, acknowledgment) => {
            console.log("joining rooms")
            if (roomsArray) {
                try {
                    roomsArray.forEach(roomId => socket.join(roomId))
                    socket.join("globalChannel")
                    const response = { success: true }
                    acknowledgment(response)
                } catch (error) {
                    console.log("join rooms error", error)
                }
            }
        })

        socket.on('sendMessage', async (messageData, acknowledgment) => { 

            // messageData = { roomId, senderId, username, messageContent, dateCreated }

            // get previous messages from redis and append new message
            try {
                const jsonMessageLog = await client.hGet('chatLogs', messageData.roomId)
                const messageLog = jsonMessageLog ? JSON.parse(jsonMessageLog) : []

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
                    // data: currentMessage,
                    roomId: messageData.roomId,
                    messageId:  messageData.message.messageId
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

        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId)
            console.log(socket.id, "removed from", roomId)
        })

        socket.on('disconnect', () => {
            delete socket.id
        })
    })
}

module.exports = { socket }