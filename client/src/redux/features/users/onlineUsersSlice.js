import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    onlineUsersList: [],
}

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {

        updateOnlineUsersList: (state, action) => {
            state.onlineUsersList = Object.values(action.payload.onlineUsers)
        },

    },
})

export const { updateOnlineUsersList } = onlineUsersSlice.actions

export default onlineUsersSlice.reducer