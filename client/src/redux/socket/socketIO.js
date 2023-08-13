import { io } from "socket.io-client";
import { getNewRoomData } from "../features/rooms/roomSlice";
import { addRoomToUserRoomsList, socketIoLeaveRoom, removeRoomFromUserSlice } from "../features/users/userSlice";
import { removeRoomFromRoomSlice } from "../features/rooms/roomSlice";
import { pushMessageToChatLog, getNewChatLogData, socketIoJoinRooms, removeRoomFromChatLogSlice } from "../features/chatLogs/chatLogSlice";



// connect to socket.io
const URL = "http://localhost:8080"
export const socket = io(URL, {
        reconnection: true,       
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
    })

// join rooms setup in redux chatLogSlice
// send message setup in redux chatLogSlice

export const socketIoListenForMessage = (dispatch) => {
    socket.on("message", (messageData) => {
        dispatch(pushMessageToChatLog(messageData))
        console.log("new message", messageData)
    })
}

export const socketIoHeartbeat = () => {
    socket.on('ping', () => {
        socket.emit('pong', {beat: 1})
    })
}

export const socketIoListenForGlobalAlert = (dispatch, userId, userRooms) => {
    socket.on('globalAlert', (data) => {

        console.log("global alert", data)
        console.log("userid", userId)
        console.log(data.eventType)

        if (data.eventType === 'newRoomCreated') {
            const newRoomId = data.eventData.roomId
            if (data.eventData.users.includes(userId) ) {
                dispatch(socketIoJoinRooms([newRoomId]))
            }
            if (data.eventData.users.includes(userId) && data.eventData.createdBy !== userId) {
                dispatch(addRoomToUserRoomsList(newRoomId))
                dispatch(getNewRoomData(newRoomId))
                dispatch(getNewChatLogData(newRoomId))
            }
        }

        if (data.eventType === 'usersAddedToRoom') {
            const addedUserIdsArr = data.eventData.addedUsers
            if (addedUserIdsArr.includes(userId)) {
                const roomId = data.eventData.roomId
                dispatch(socketIoJoinRooms([roomId]))

                dispatch(addRoomToUserRoomsList(roomId))
                dispatch(getNewRoomData(roomId))
                dispatch(getNewChatLogData(roomId))
            }
        }

        if (data.eventType === 'usersRemovedFromRoom') {
            // socket io leave room
            // user rooms: removed from room, no longer listening (unjoined)
            // so no updates
            // add to removed rooms list
            const roomId = data.eventData.roomId
            if (data.eventData.users.includes(userId)) {
                dispatch(socketIoLeaveRoom(roomId))

                // update rooms, user, chatLog slices
                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // add alert / notification
            }
        }

        if (data.eventType === 'roomDeleted') {
            // socket io leave room
            // user rooms: removed from room, no longer listening (unjoined)
            // so no updates
            // add to deleted rooms list
            const roomId = data.eventData.roomId
            console.log("room DELETED", userRooms)
            if (userRooms?.includes(roomId)) {
                dispatch(socketIoLeaveRoom(roomId))

                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // update rooms, user, chatLog slices

                // add alert / notification
            }
        }

    })
}