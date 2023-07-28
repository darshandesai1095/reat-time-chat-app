import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: false,
    email: null,
    username: null,
    firebaseUserId: null,
    mongoDbUserId: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        loginRequest: (state) => {
            state.loading = true
            state.error = false
        },

        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.error = false
            state.email = action.payload.userEmail
            state.username = null
            state.firebaseUserId = action.payload.firebaseUserId
            state.mongoDbUserId = null
        },

        loginFailure: (state, action) => {
            state.isAuthenticated = false
            state.loading = false
            state.error = action.payload.error
        },

        logout: (state) => {
            state.isAuthenticated = false
            state.loading = false
            state.error = false
            state.email = null
            state.username = null
            state.firebaseUserId = null
            state.mongoDbUserId = null
        },

        updateUserCredentials: (state, action) => {
            state.username = action.payload.userName
            state.mongoDbUserId = action.mongoDbUserId
        }
    },
})

export const { loginRequest, loginSuccess, loginFailure, logout, updateUserCredentials } = userSlice.actions
export default userSlice.reducer