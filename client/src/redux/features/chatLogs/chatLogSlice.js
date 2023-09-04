import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { socket } from '../../socket/socketIO'

// const baseURL = 'https://server-boisterous-sunburst-f3d32f.onrender.com/api'
const PRODUCTION_BASE_URL = "https://server-boisterous-sunburst-f3d32f.onrender.com/api"
const baseURL = PRODUCTION_BASE_URL


export const getChatLogsByRoomsArray = createAsyncThunk(
    'chatLogs/getChatLogsByRoomsArray',
    async (roomIdsArr, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/chatLogs/getChatLogs`, {
                params: {
                    roomIdsArray: roomIdsArr,
                },
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getChatLogsByFirebaseUserId = createAsyncThunk(
    'chatLogs/getChatLogsByFirebaseUserId',
    async (firebaseUserId, { rejectWithValue }) => {
        console.log("getting logs...")
        console.log("URL", `${baseURL}/chatLogs/getChatLogsByFirebaseUserId/${firebaseUserId}`)
        try {
            const response = await axios
                .get(`${baseURL}/chatLogs/getChatLogsByFirebaseUserId/${firebaseUserId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const socketIoJoinRooms = createAsyncThunk(
    'chatLogs/socketIoJoinRooms', async (data) => {
    return new Promise((resolve, reject) => {
        socket.emit('joinRooms', data, (response) => {
          // Handle any response from the server if needed
          if (response.success) {
            resolve()
          } else {
            reject(response.error)
          }
        })
      })
    }
)

export const socketIoLeaveRooms = createAsyncThunk(
    'chatLogs/socketIoLeaveRooms', async (roomsArray) => {
    return new Promise((resolve, reject) => {
        socket.emit('leaveRooms', roomsArray, (response) => {
          // Handle any response from the server if needed
          if (response.success) {
            resolve()
          } else {
            reject(response.error)
          }
        })
      })
    }
)

export const socketIoSendMessageToServer = createAsyncThunk(
    'chatLogs/socketIoSendMessageToServer', async (messageData) => {
    return new Promise((resolve, reject) => {
        socket.emit('sendMessage', messageData, (response) => {
          // Handle any response from the server if needed
          if (response.success) {
            resolve({data: response})
          } else {
            reject({
                error: response.error, 
                roomId: messageData.roomId, 
                messageId: messageData.message.messageId, 
            })
          }
        })
      })
    }
)

// similar to getChatLogsByRoomsArray, but one array item and append to state instead of replace
export const getNewChatLogData = createAsyncThunk(
    'chatLogs/getNewChatLogData',
    async (roomId, { rejectWithValue }) => { 
        try {
            const response = await axios.get(`${baseURL}/chatLogs/getChatLogs`, {
                params: {
                    roomIdsArray: [roomId],
                },
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    chatLogData: null, // [ {rm1}, {rm2}, {rm3} ] -> { roomId, roomName, roomUsers, dateCreated, messagesArray[{},{},{}] }
    loading: false,
    roomsJoined: false,
    error: false,
    chatLogsErrorLog: []
}

export const chatLogSlice = createSlice({
    name: 'chatLogs',
    initialState,
    reducers: {
        chatLogRequest: (state) => {
            state.loading = true
            state.error = false
        },
        loadChatLogSuccess: (state, action) => {
            state.loading = false
            state.error = false
            state.chatLogData = action.payload
        },
        // push message to chat log (optimistic updates)
        // if error in builder.addCase(socketIoSendMessageToServer.rejected...
        // update message status in builder
        pushMessageToChatLog: (state, action) => { // on new message 
            // get current room id from action.payload
            // use room id to find room index in chatLogData
            // state.chatLogData[index].messagesArray.push({})
            const roomId = action.payload.roomId
            const index = state.chatLogData?.findIndex(rooms => rooms.roomId === roomId)
            const roomMessagesArray = [...state.chatLogData[index]?.messagesArray, action.payload.message]
            const roomObj = {
                roomId,
                roomName: state.chatLogData[index].roomName,
                roomUsers: state.chatLogData[index].roomUsers,
                dateCreated: state.chatLogData[index].dateCreated,
                messagesArray: roomMessagesArray
            }
            state.chatLogData = [ ...state.chatLogData.slice(0, index),
                                  roomObj,
                                  ...state.chatLogData.slice(index+1) ]

            // state.chatLogData[index].messagesArray = [...state.chatLogData[index]?.messagesArray, action.payload.message]
            // console.log("chatlog slice push message to chat log", action.payload.message)
        },

        removeRoomFromChatLogSlice: (state, action) => {
            state.chatLogData = state.chatLogData.filter(roomObj => roomObj.roomId !== action.payload)
        },
        updateRoomNameInChatLogReducer: (state, action) => {
            const { roomId, roomName, transmissionID, transmissionIDs } = action.payload
            if (transmissionIDs.includes(transmissionID)) {return}
            // find room by id -> update name
            const activeRoomIdx = state.chatLogData.findIndex(room => room.roomId === roomId)
            state.chatLogData[activeRoomIdx].roomName = roomName
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getChatLogsByRoomsArray.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getChatLogsByRoomsArray.fulfilled, (state, action) => {
            state.loading = false
            state.chatLogData = action.payload[0]
            state.error = null
        })
        builder.addCase(getChatLogsByRoomsArray.rejected, (state, action) => {
            state.loading = false
            state.chatLogData = null
            state.error = action.payload // The error message from rejectWithValue is set in the state
        })


        builder.addCase(getChatLogsByFirebaseUserId.pending, (state) => {
            state.loading = true
            state.error = false
            console.log("pending...")
        })
        builder.addCase(getChatLogsByFirebaseUserId.fulfilled, (state, action) => {
            state.loading = false
            state.chatLogData = action.payload
            state.error = null
            console.log("fulfilled", action.payload)
        })
        builder.addCase(getChatLogsByFirebaseUserId.rejected, (state, action) => {
            state.loading = false
            state.chatLogData = null
            state.error = action.payload // The error message from rejectWithValue is set in the state
            console.log("rejected - CHAT LOGS", action.payload)
        })


        builder.addCase(socketIoSendMessageToServer.pending, (state) => {
            // state.loading = true
            // state.error = false
            // deliveryStatus: "sending", already set in dispatch
        })
        builder.addCase(socketIoSendMessageToServer.fulfilled, (state, action) => {
            console.log("message send fulfilled", action.payload)
            const { roomId, messageId } = action.payload.data
            const roomIndex = state.chatLogData.findIndex(room => room.roomId === roomId)
            const messagesArray = state.chatLogData[roomIndex].messagesArray
            const messageIndex = messagesArray.findIndex(message => message.messageId === messageId)
            state.chatLogData[roomIndex].messagesArray[messageIndex].deliveryStatus = "sent"
        })
        builder.addCase(socketIoSendMessageToServer.rejected, (state, action) => {
            const { Error, roomId, messageId } = action.payload
            state.error = Error
            const roomIndex = state.chatLogData.findIndex(room => room.roomId === roomId)
            const messagesArray = state.chatLogData[roomIndex].messagesArray
            const messageIndex = messagesArray.findIndex(message => message.messageId === messageId)
            state.chatLogData[roomIndex].messagesArray[messageIndex].deliveryStatus = "failed to send"
        })


        builder.addCase(socketIoJoinRooms.pending, (state) => {
            // state.loading = true
            // state.error = false
        })
        builder.addCase(socketIoJoinRooms.fulfilled, (state, action) => {
            // state.loading = false
            // state.chatLogData = action.payload
            // state.error = null
            state.roomsJoined = true
        })
        builder.addCase(socketIoJoinRooms.rejected, (state, action) => {
            // state.loading = false
            // state.chatLogData = null
            state.error = action.payload 

        })

        builder.addCase(getNewChatLogData.pending, (state) => {
            state.error = false
        })
        builder.addCase(getNewChatLogData.fulfilled, (state, action) => {
            console.log("current state.chatLogData", state.chatLogData.length)
            console.log("incoming log", action.payload[0], "current", state.chatLogData)
            state.chatLogData = [ ...state.chatLogData, action.payload[0] ]
        })
        builder.addCase(getNewChatLogData.rejected, (state, action) => {
            state.error = action.payload // The error message from rejectWithValue is set in the state
            state.chatLogsErrorLog = [...state.chatLogsErrorLog, action.payload]
        })
    }
})



export const { 
   chatLogRequest,
   loadChatLogSuccess,
   pushMessageToChatLog,
   removeRoomFromChatLogSlice,
   changeCurrentActiveRoom,
   updateRoomNameInChatLogReducer
} = chatLogSlice.actions

export default chatLogSlice.reducer