import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalAlerts: 0,
    alertLog: [], // [{}, {}, {},...] -> { alertTitle, alertTime, alertInfo } 
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
                alertTitle: action.payload.alertTitle,
                alertTime: action.payload.alertTime,
                alertInfo: action.payload.alertInfo
            }
            state.alertLog = [ newAlert ,...state.alertLog]
        }
    }
})



export const { 
    incrementGlobalAlerts,
    resetGlobalAlerts,
    updateAlertLog
} = globalAlertSlice.actions

export default globalAlertSlice.reducer