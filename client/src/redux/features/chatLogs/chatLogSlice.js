import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { socket } from '../../socket/socketIO'

const baseURL = 'http://localhost:8080/api'


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
        try {
            const response = await axios
                .get(`${baseURL}/chatLogs/getChatLogsByFirebaseUserId/${firebaseUserId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const sendMessageToServer = createAsyncThunk(
    'chatLogs/sendMessageToServer', async (messageData) => {
    return new Promise((resolve, reject) => {
        socket.emit('sendMessage', messageData, (response) => {
          // Handle any response from the server if needed
          if (response.success) {
            console.log("response",response.data)
            resolve(response.data)
          } else {
            reject(response.error)
          }
        })
      })
    }
)

const initialState = {
    chatLogData: null,
    loading: false,
    error: false
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
            console.log("loading chat logs")
        })
        builder.addCase(getChatLogsByFirebaseUserId.fulfilled, (state, action) => {
            state.loading = false
            state.chatLogData = action.payload
            state.error = null
            console.log("chat logs", action.payload)
        })
        builder.addCase(getChatLogsByFirebaseUserId.rejected, (state, action) => {
            state.loading = false
            state.chatLogData = null
            state.error = action.payload // The error message from rejectWithValue is set in the state
        })


        builder.addCase(sendMessageToServer.pending, (state) => {
            // state.loading = true
            // state.error = false
            console.log("*** sending message...")
        })
        builder.addCase(sendMessageToServer.fulfilled, (state, action) => {
            // state.loading = false
            // state.chatLogData = action.payload
            // state.error = null
            console.log("*** message sent", action.payload)
        })
        builder.addCase(sendMessageToServer.rejected, (state, action) => {
            // state.loading = false
            // state.chatLogData = null
            state.error = action.payload 
            console.log("*** failed to send message", action.payload)
        })
    }
})



export const { 
   chatLogRequest,
   loadChatLogSuccess
} = chatLogSlice.actions

export default chatLogSlice.reducer