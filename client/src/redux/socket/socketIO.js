import { io } from "socket.io-client";
import { getNewRoomData } from "../features/rooms/roomSlice";
import { addRoomToUserRoomsList, socketIoLeaveRoom, removeRoomFromUserSlice } from "../features/users/userSlice";
import { removeRoomFromRoomSlice } from "../features/rooms/roomSlice";
import { pushMessageToChatLog, getNewChatLogData, socketIoJoinRooms, removeRoomFromChatLogSlice } from "../features/chatLogs/chatLogSlice";
import { updateActivityLog } from "../features/activityLogs/activityLogSlice";
import { setLastActiveInLocalStorage } from "../../functions/misc/localStorage";
import { updateAlertLog } from "../features/globalAlerts/globalAlertSlice";



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
    })
}

export const socketIoHeartbeat = () => {
    socket.on('ping', () => {
        socket.emit('pong', {beat: 1})
    })
}

export const socketIoListenForGlobalAlert = (dispatch, userId, userRooms, activityLog) => {
    socket.on('globalAlert', (data) => {

        if (data.eventType === 'newRoomCreated') {
            const newRoomId = data.eventData.roomId
            // if (data.eventData.users.includes(userId) ) {
          
            // }
            if (data.eventData.users.includes(userId) && (data.eventData.createdBy !== userId)) {
                dispatch(socketIoJoinRooms([newRoomId]))
                
                dispatch(addRoomToUserRoomsList(newRoomId))
                dispatch(getNewRoomData(newRoomId))
                dispatch(getNewChatLogData(newRoomId))

                // try this instead to prevent double render
                // getUserByMongoBbUserId
                // getRoomsByMongoDbUserId

                // update redux activity log, roomId: time=now
                const date = Date.now()
                dispatch(updateActivityLog({
                    ...activityLog,
                    roomId: newRoomId,
                    timestamp: date
                }))

                setLastActiveInLocalStorage(userId, {
                    ...activityLog,
                    [newRoomId]: date
                })

                dispatch(updateAlertLog({
                    alertTitle: "New Group Created",
                    alertTime: date,
                    alertInfo: {
                        roomName: data.eventData.roomName,
                        createdByUsername: data.eventData.createdByUsername
                    }
                }))
            }

        }

        if (data.eventType === 'usersAddedToRoom') {
            const addedUserIdsArr = data.eventData.addedUsers
            const newRoomId = data.eventData.roomId
            if (addedUserIdsArr.includes(userId) && (userId !== data.eventData.updatedById)) {
                const roomId = data.eventData.roomId
                dispatch(socketIoJoinRooms([roomId]))

                dispatch(addRoomToUserRoomsList(roomId))
                dispatch(getNewRoomData(roomId))
                dispatch(getNewChatLogData(roomId))

                // update redux activity log, roomId: time=now
                const date = Date.now()
                dispatch(updateActivityLog({
                    ...activityLog,
                    roomId: newRoomId,
                    timestamp: date
                }))

                setLastActiveInLocalStorage(userId, {
                    ...activityLog,
                    [newRoomId]:  date
                })

                dispatch(updateAlertLog({
                    alertTitle: "User Added To Group",
                    alertTime: date,
                    alertInfo: {
                        roomName: data.eventData.roomName,
                        updatedByUsername: data.eventData.updatedByUsername
                    }
                }))

            }
        }

        if (data.eventType === 'usersRemovedFromRoom') {
            // socket io leave room
            // user rooms: removed from room, no longer listening (unjoined)
            // so no updates
            // add to removed rooms list
            const roomId = data.eventData.roomId
            if (data.eventData.addedUsers.includes(userId) && (userId !== data.eventData.updatedById)) {
                dispatch(socketIoLeaveRoom(roomId))

                // update rooms, user, chatLog slices
                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // also rerender info for all users in the group

                // add alert / notification
                const date = Date.now()
                dispatch(updateAlertLog({
                    alertTitle: "User Removed From Group",
                    alertTime: date,
                    alertInfo: {
                        roomName: data.eventData.roomName,
                        updatedByUsername: data.eventData.updatedByUsername
                    }
                }))
            }
        }

        if (data.eventType === 'roomDeleted') {
            // socket io leave room
            // user rooms: removed from room, no longer listening (unjoined)
            // so no updates
            // add to deleted rooms list
            const roomId = data.eventData.roomId
            if (userRooms?.includes(roomId) && userId !== data.eventData.deletedBy) {
                dispatch(socketIoLeaveRoom(roomId))

                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // update rooms, user, chatLog slices

                // add alert / notification
                const date = Date.now()
                dispatch(updateAlertLog({
                    alertTitle: "Group Deleted",
                    alertTime: date,
                    alertInfo: {
                        roomName: data.eventData.roomName,
                        deletedBy: data.eventData.deletedByUsername
                    }
                }))
            }
        }

        if (data.eventType === 'roomNameUpdated') {
            const roomId = data.eventData.roomId
            if (userRooms?.includes(roomId) && userId !== data.eventData.updatedById) {
                // dispatch(socketIoLeaveRoom(roomId))
                // update rooms, user, chatLog slices

                // add alert / notification
                const date = Date.now()
                dispatch(updateAlertLog({
                    alertTitle: "Group Name Updated",
                    alertTime: date,
                    alertInfo: {
                        originalRoomName: data.eventData.originalRoomName,
                        roomName: data.eventData.roomName,
                        updatedByUsername: data.eventData.updatedByUsername,
                    }
                }))

            }
        }

    })
}