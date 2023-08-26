import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lastActive: {"roomId": 'lastActiveString'},
    loading: false,
    error: null
}

export const activityLogSlice = createSlice({
    name: 'activityLog',
    initialState, // lastActiveTimes: { rmId1: lastActivetime, rmId2: lastActivetime, rmId3: lastActivetime, ... }
    reducers: {
        // to be run once when the user logs in
        // (after getting data from local storage)
        syncActivityLogWithLocalStorage: (state, action) => {
            state.lastActive = action.payload
        },
        updateActivityLog: (state, action) => {
            const { roomId, timestamp } = action.payload
            if (roomId) {
                // state.lastActive[`${roomId}`] = timestamp
                state.lastActive[roomId] = timestamp || 0
            }

        }
    },
})

export const { syncActivityLogWithLocalStorage, updateActivityLog } = activityLogSlice.actions

export default activityLogSlice.reducer