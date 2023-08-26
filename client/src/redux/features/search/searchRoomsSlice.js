import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    totalMatches: 0
}

export const searchRoomsSlice = createSlice({
    name: 'searchRooms',
    initialState,
    reducers: {
        resetMatchCount: (state) => {
            state.totalMatches = 0
        },
        updateTotalMatches: (state) => {
            state.totalMatches = state.totalMatches +1
        },
    },
})

export const { resetMatchCount, updateTotalMatches } = searchRoomsSlice.actions

export default searchRoomsSlice.reducer