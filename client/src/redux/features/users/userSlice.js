import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { socket } from '../../socket/socketIO'

// const baseURL = 'https://server-boisterous-sunburst-f3d32f.onrender.com/api'
const PRODUCTION_BASE_URL = "https://server-boisterous-sunburst-f3d32f.onrender.com/api"
const baseURL = PRODUCTION_BASE_URL


export const createNewUser = createAsyncThunk(
    'rooms/createNewUser',
    async ({ firebaseUserId, email, username } , { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/users/create`, { 
                firebaseUserId, 
                email, 
                username
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
    async ({ userId, newUsername } , { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/users/updateUsername/${userId}`, {
                newUsername: newUsername
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserProfilePicture = createAsyncThunk(
    'users/updateUserProfilePicture',
    async ({ userId, updatedUserProfilePictureUrl } , { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/users/updateUserProfilePicture/${userId}`, {
                updatedUserProfilePictureUrl: updatedUserProfilePictureUrl
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId , { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/users/delete/${userId}`)
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
    profilePictureUrl: "https://i.postimg.cc/13JNx5YY/image-Ot-ILHw-Wp-NCPt.jpg",
    userErrorLog: []
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

        updateUserCredentialsUsername: (state, action) => {
            state.username = action.payload
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
        },

        clearUserErrorLog: (state) => {
            state.userErrorLog = []
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
            state.profilePictureUrl = action.payload.profilePictureUrl
            
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
            state.profilePictureUrl = action.payload.profilePictureUrl

        })


        builder.addCase(getUserByFirebaseUserId.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(getUserByFirebaseUserId.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.email = action.payload[0]?.email
            state.username = action.payload[0]?.username
            state.firebaseUserId = action.payload[0]?.firebaseUserId
            state.mongoDbUserId = action.payload[0]?._id
            state.rooms = action.payload[0]?.rooms
            state.profilePictureUrl = action.payload[0]?.profilePictureUrl
        })


        builder.addCase(updateUsername.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
            console.log("user slice, update username error", action.payload )
        })
        builder.addCase(updateUsername.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.username = action.payload.username
        })


        builder.addCase(updateUserProfilePicture.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateUserProfilePicture.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 

        })
        builder.addCase(updateUserProfilePicture.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.profilePictureUrl = action.payload.profilePictureUrl
        })
        

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
            console.log("delete user error", action.payload) // delete user error Request failed with status code 500
            state.userErrorLog = [...state.userErrorLog, {
                alertTitle: "Error Deleting Account",
                alertTime: Date.now(),
                alertMessage: "An error occured whilst trying to delete your account",
                alertMetaData: action.payload,
                isError: true
            }]
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
    removeRoomFromUserSlice,
    updateUserCredentialsUsername,
    clearUserErrorLog
} = userSlice.actions

export default userSlice.reducer