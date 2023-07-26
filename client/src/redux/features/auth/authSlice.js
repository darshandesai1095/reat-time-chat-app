import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false, // Represents if the user is authenticated or not
    userEmail: null, // Holds user data when logged in
    userName: null, // Holds user data when logged in
    loading: false, // Represents the loading state during authentication
    error: null, // Holds any authentication-related errors
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define reducers for updating the state during authentication process
    loginRequest: (state) => {
        state.loading = true
        state.error = null
    },

    loginSuccess: (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.loading = false
        state.error = null
    },

    loginFailure: (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.loading = false
        state.error = action.payload
    },

    logout: (state) => {
        state.user = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
    },
  },
})

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer