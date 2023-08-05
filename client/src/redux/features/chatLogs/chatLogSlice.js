import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
    }
})



export const { 
   chatLogRequest,
   loadChatLogSuccess
} = chatLogSlice.actions

export default chatLogSlice.reducer