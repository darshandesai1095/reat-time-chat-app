import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { socket } from '../../socket/socketIO'


const baseURL = 'http://localhost:8080/api'

export const createNewUser = createAsyncThunk(
    'rooms/createNewUser',
    async ({ firebaseUserId, email, username, profilePictureUrl } , { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/users/create`, { 
                firebaseUserId, 
                email, 
                username, 
                profilePictureUrl 
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getUserByMongoDbUserId = createAsyncThunk(
    'users/getUserByMongoDbUserId',
    async ({ userId } , { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/users/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getUserByFirebaseUserId = createAsyncThunk(
    'users/getUserByFirebaseUserId',
    async ({ firebaseUserId } , { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/users/firebase/${firebaseUserId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateUsername = createAsyncThunk(
    'users/updateUsername',
    async ({ userId } , { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/users/updateUsername/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async ({ userId } , { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/users/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const socketIoLeaveRoom = createAsyncThunk(
    'users/socketIoLeaveRoom', async (roomId) => {
    return new Promise((resolve, reject) => {
        socket.emit('leaveRoom', roomId, (response) => {
          // Handle any response from the server if needed
          if (response.success) {
            resolve(response.data)
          } else {
            reject(response.error)
          }
        })
      })
    }
)


const initialState = {
    isAuthenticated: false,
    loading: false,
    error: false,
    email: null,
    username: null,
    firebaseUserId: null,
    mongoDbUserId: null,
    rooms: [],
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
            state.email = action.payload.email
            state.username = null
            state.firebaseUserId = action.payload.firebaseUserId
            state.mongoDbUserId = null
            state.rooms = action.payload.rooms || null
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
            state.username = action.payload.username
            state.mongoDbUserId = action.payload.mongoDbUserId
            state.email = action.payload.email
        },

        syncUserData: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.rooms = action.payload.rooms
        },
        
        addRoomToUserRoomsList: (state, action) => {
            state.rooms = [...state.rooms, action.payload]
        },

        removeRoomFromUserSlice: (state, action) => {
            const index = state.rooms?.indexOf(action.payload)
            state.rooms = [...state.rooms.slice(0, index), ...state.rooms.slice(index + 1)]
        }

    },
    extraReducers: (builder) => {

        // create user

        builder.addCase(createNewUser.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(createNewUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.error = false

            state.email = action.payload.email ? action.payload.email : null
            state.username = action.payload.username
            state.firebaseUserId = action.payload.firebaseUserId
            state.mongoDbUserId = action.payload._id
            state.rooms = action.payload.rooms
        })
        builder.addCase(createNewUser.rejected, (state, action) => {
            state.isAuthenticated = false
            state.loading = false
            state.error = action.payload.error
        })


        // use this to sync data
        builder.addCase(getUserByMongoDbUserId.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getUserByMongoDbUserId.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(getUserByMongoDbUserId.fulfilled, (state, action) => {
            // during operation this is followed by another promise
            // so updating the loading state to true will cause a 
            // momentary flash on the screen
            // state.loading = false
            state.error = null
            state.email = action.payload.email
            state.username = action.payload.username
            // state.firebaseUserId = action.payload.firebaseUserId
            // state.mongoDbUserId = action.payload._id
            state.rooms = action.payload.rooms
            console.log("slice:", action.payload)
        })


        builder.addCase(getUserByFirebaseUserId.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(getUserByFirebaseUserId.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.email = action.payload[0].email
            state.username = action.payload[0].username
            state.firebaseUserId = action.payload[0].firebaseUserId
            state.mongoDbUserId = action.payload[0]._id
            state.rooms = action.payload[0].rooms
        })


        builder.addCase(updateUsername.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(updateUsername.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.username = action.payload[0].username
        })


        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.isAuthenticated = false
            state.loading = false
            state.error = null
            state.email = null
            state.username = null
            state.firebaseUserId = null
            state.mongoDbUserId = null
            state.rooms = null
        })
    }
})

export const { 
    loginRequest, 
    loginSuccess,
    loginFailure, 
    logout, 
    updateUserCredentials,
    addRoomToUserRoomsList,
    removeRoomFromUserSlice
} = userSlice.actions

export default userSlice.reducer