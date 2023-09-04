import { io } from "socket.io-client";
import { getNewRoomData, updateRoomNameReducer } from "../features/rooms/roomSlice";
import { addRoomToUserRoomsList, socketIoLeaveRoom, removeRoomFromUserSlice } from "../features/users/userSlice";
import { removeRoomFromRoomSlice } from "../features/rooms/roomSlice";
import { pushMessageToChatLog, getNewChatLogData, socketIoJoinRooms, removeRoomFromChatLogSlice } from "../features/chatLogs/chatLogSlice";
import { updateActivityLog } from "../features/activityLogs/activityLogSlice";
import { setLastActiveInLocalStorage } from "../../functions/misc/localStorage";
import { updateAlertLog } from "../features/globalAlerts/globalAlertSlice";
import { updateOnlineUsersList } from "../features/users/onlineUsersSlice";


// connect to socket.io
// const URL = "http://localhost:8080"
const URL = "https://server-boisterous-sunburst-f3d32f.onrender.com/"


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

export const checkOnlineStatus = (dispatch) => {
    socket.on('ping', (data) => {
        socket.emit('pong')
        dispatch(updateOnlineUsersList(data))
    })
}

export const socketIoListenForGlobalAlert = (dispatch, userId, userRooms, activityLog, transmissionIDs, setTransmissionIDs) => {
    socket.on('globalAlert', (data) => {
        console.log("global alert data", transmissionIDs, data)
        if ( [data.transmissionID] in transmissionIDs ) {
            return
        } else {
            // add to set
            setTransmissionIDs( { ...transmissionIDs, [data.transmissionID]: true } )
        }

        if (data.eventType === 'newRoomCreated') {
            const newRoomId = data.eventData.roomId
            // if (data.eventData.users.includes(userId) ) {
          
            // }
            if (data.eventData.users.includes(userId)) {
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

                if (data.eventData.createdBy !== userId) {
                    dispatch(updateAlertLog({
                        transmissionId: data.transmissionID,
                        alertTitle: "New Group Created",
                        alertTime: date,
                        alertInfo: {
                            roomName: data.eventData.roomName,
                            createdByUsername: data.eventData.createdByUsername
                        }
                    }))
                }

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

                // need to fetch roomchatlog

                setLastActiveInLocalStorage(userId, {
                    ...activityLog,
                    [newRoomId]:  date
                })

                dispatch(updateAlertLog({
                    transmissionId: data.transmissionID,
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
            if ( data.eventData.addedUsers.includes(userId) ) {
                dispatch(socketIoLeaveRoom(roomId))

                // update rooms, user, chatLog slices
                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // also rerender info for all users in the group

                if ( (userId !== data.eventData.updatedById) ) {
                    // add alert / notification
                    const date = Date.now()
                    dispatch(updateAlertLog({
                        transmissionId: data.transmissionID,
                        alertTitle: "User Removed From Group",
                        alertTime: date,
                        alertInfo: {
                            roomName: data.eventData.roomName,
                            updatedByUsername: data.eventData.updatedByUsername
                        }
                    }))
                }
            }
        }

        if (data.eventType === 'roomDeleted') {
            console.log("roomdeleted")
            // socket io leave room
            // user rooms: removed from room, no longer listening (unjoined)
            // so no updates
            // add to deleted rooms list
            const roomId = data.eventData.roomId
            if ( userRooms?.includes(roomId) ) {
                dispatch(socketIoLeaveRoom(roomId))

                dispatch(removeRoomFromUserSlice(roomId))
                dispatch(removeRoomFromRoomSlice(roomId))
                dispatch(removeRoomFromChatLogSlice(roomId))

                // update rooms, user, chatLog slices

                if ( userId !== data.eventData.deletedBy ) {
                    // add alert / notification
                    const date = Date.now()
                    dispatch(updateAlertLog({
                        transmissionId: data.transmissionID,
                        alertTitle: "Group Deleted",
                        alertTime: date,
                        alertInfo: {
                            roomName: data.eventData.roomName,
                            deletedBy: data.eventData.deletedByUsername
                        }
                    }))
                }
            }
        }

        if (data.eventType === 'roomNameUpdated') {
            const roomId = data.eventData.roomId
            if (userRooms?.includes(roomId) && (userId !== data.eventData.updatedById)) {
                // dispatch(socketIoLeaveRoom(roomId))
                // update rooms, user, chatLog slices

                // add alert / notification
                const date = Date.now()
                dispatch(updateAlertLog({
                    transmissionId: data.transmissionID,
                    alertTitle: "Group Name Updated",
                    alertTime: date,
                    alertInfo: {
                        originalRoomName: data.eventData.originalRoomName,
                        roomName: data.eventData.roomName,
                        updatedByUsername: data.eventData.updatedByUsername,
                    }
                }))

                // room slice (+ chat log slice?) -> find index based on roomID, update roomName
                const roomName = data.eventData.roomName
                const transmissionID = data.transmissionID
                dispatch(updateRoomNameReducer({roomId, roomName, transmissionID, transmissionIDs}))

            }
        }

    })
}