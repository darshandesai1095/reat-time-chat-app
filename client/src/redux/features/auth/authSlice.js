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

export const authSlice = createSlice({
    name: 'auth',
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
            state.username = action.payload.userName
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
    },
})

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer