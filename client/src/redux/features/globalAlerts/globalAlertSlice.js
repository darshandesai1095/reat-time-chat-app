import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// const baseURL = 'https://server-boisterous-sunburst-f3d32f.onrender.com/api'
const PRODUCTION_BASE_URL = "https://server-boisterous-sunburst-f3d32f.onrender.com/api"
const baseURL = PRODUCTION_BASE_URL

export const getNotifications = createAsyncThunk(
    'globalAlerts/getNotifications',
    async (userId, { rejectWithValue }) => {
        if (!userId) return
        try {
            const response = await axios.get(`${baseURL}/notifications/getNotifications/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const clearNotifications = createAsyncThunk(
    'globalAlerts/clearNotifications',
    async ({userId}, { rejectWithValue, getState }) => {
        const state = getState()
        const alertLog = state.globalAlerts.alertLog
        try {
            const response = await axios.delete(`${baseURL}/notifications/clearNotifications/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue({
                error: error.message,
                alertLog: alertLog
            })
            // return rejectWithValue(error)
        }
    }
)

const initialState = {
    totalAlerts: 0,
    alertLog: [], // [{}, {}, {},...] -> { alertTitle, alertTime, alertInfo } // add alert id
    status: null,
}

export const globalAlertSlice = createSlice({
    name: 'globalAlerts',
    initialState,
    reducers: {
        incrementGlobalAlerts: (state) => {
            state.totalAlerts = state.totalAlerts + 1
        },
        resetGlobalAlerts: (state) => {
            state.totalAlerts = 0
        },
        updateAlertLog: (state, action) => {
            state.totalAlerts = state.totalAlerts + 1
            const newAlert = { 
                alertId: action.payload.transmissionID,
                alertTitle: action.payload.alertTitle,
                alertTime: action.payload.alertTime,
                alertInfo: action.payload.alertInfo
            }
            state.alertLog = [ ...state.alertLog, newAlert ]
        }
    },

    extraReducers: (builder) => {
        // builder.addCase(getNotifications.pending, (state, action) => {
        // })
        builder.addCase(getNotifications.fulfilled, (state, action) => {
            try {
                state.alertLog = [...state.alertLog, ...action?.payload]
                state.totalAlerts = state.alertLog.length
                // function to prevent duplicate alert ids
            } catch (error) {
                console.log("getNotifications error", error)
            }
        })
        builder.addCase(getNotifications.rejected, (state, action) => {
            console.log("error getting alertLog data", action.payload)
        }) 


        builder.addCase(clearNotifications.pending, (state) => {
            state.status = 'Clearing Notifications'
        })
        builder.addCase(clearNotifications.fulfilled, (state) => {
            state.alertLog = []
            state.totalAlerts = 0
            state.status = null
        })
        builder.addCase(clearNotifications.rejected, (state, action) => {
            state.status = null
            state.alertLog = action.payload.alertLog
            state.totalAlerts = action.payload.alertLog.length
        })

    }
})



export const { 
    incrementGlobalAlerts,
    resetGlobalAlerts,
    updateAlertLog
} = globalAlertSlice.actions

export default globalAlertSlice.reducer