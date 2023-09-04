import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


// const baseURL = 'https://server-boisterous-sunburst-f3d32f.onrender.com/api'
const PRODUCTION_BASE_URL = "https://server-boisterous-sunburst-f3d32f.onrender.com/api"
const baseURL = PRODUCTION_BASE_URL

export const getRoomsByFirebaseUserId = createAsyncThunk(
    'rooms/getRoomsByFirebaseUserId',
    async (firebaseUserId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/rooms/firebase/${firebaseUserId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getRoomsByMongoDbUserId = createAsyncThunk(
    'rooms/getRoomsByMongoDbUserId',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/rooms/mongo/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createNewRoom = createAsyncThunk(
    'rooms/createNewRoom',
    async ({userId, roomName, membersArray}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/rooms/create/${userId}`, {
                roomName: roomName, 
                membersArray: membersArray
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// export const getRoom = createAsyncThunk() -> getRoomsByFirebaseUserId deals with this

export const addUsersToRoom = createAsyncThunk(
    'rooms/addUsersToRoom',
    async ({roomId, emailsArray, updatedById, updatedByUsername}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/rooms/addUsers/${roomId}`, {
                emailsArray,
                updatedById: updatedById,
                updatedByUsername: updatedByUsername
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getNewRoomData = createAsyncThunk(
    'rooms/getNewRoomData',
    async (roomId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/rooms/${roomId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const removeUsersFromRoom = createAsyncThunk(
    'rooms/removeUsersFromRoom',
    async ({roomId, emailsArray, updatedById, updatedByUsername}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/rooms/removeUsers/${roomId}`, {
                emailsArray: emailsArray,
                updatedById: updatedById,
                updatedByUsername: updatedByUsername
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateRoomName = createAsyncThunk(
    'rooms/updateRoomName',
    async ({roomId, originalRoomName, newRoomName, updatedById, updatedByUsername}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/rooms/${roomId}`, {
                originalRoomName: originalRoomName,
                newRoomName: newRoomName,
                updatedById: updatedById,
                updatedByUsername: updatedByUsername
            })
            return response.data
        } catch (error) {
            return rejectWithValue( { 
                error: error.message, 
                originalRoomName: originalRoomName,
                newRoomName: newRoomName,
                roomId: roomId
            })
        }
    }
)

export const updateRoomIcon = createAsyncThunk(
    'rooms/updateRoomIcon',
    async ({roomId, newRoomIconUrl}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/rooms/updateIcon/${roomId}`, {
                newRoomIconUrl: newRoomIconUrl
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async ({roomId, deletedBy, username}, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/rooms/${roomId}`, {
                data: {
                    deletedBy: deletedBy,
                    username: username
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue({
                error: error.message,
                roomId: roomId
            })
        }
    }
)


const initialState = {
    roomsData: [], // [ { roomId, roomName, dateCreated, profilePictureUrl, chatLog[chatLog.length-1].message, users } ]   
    loading: false,
    currentActiveRoomId: null,
    error: null,
    roomErrorLog: []
}

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        changeCurrentActiveRoom: (state, action) => {
            state.currentActiveRoomId = action.payload
            // state.activeRoomIndex = state.roomsData.findIndex(roomObj => roomObj.roomId === state.currentActiveRoomId)
        },
        assignCurrentActiveRoom: (state) => {
            const length = state.roomsData.length
            state.currentActiveRoomId = (state.roomsData[0].roomId || state.roomsData[length-1].roomId || null)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
            // state.activeRoomIndex = state.roomsData.findIndex(roomObj => roomObj.roomId === state.currentActiveRoomId)
        },
        removeRoomFromRoomSlice: (state, action) => {
            state.roomsData = state.roomsData.filter(roomObj => roomObj.roomId !== action.payload)
            // update current activeRoomID
            state.currentActiveRoomId = state.roomsData[state.roomsData.length-1].roomId || state.roomsData[0].roomId
        },
        updateRoomNameReducer: (state, action) => {
            const { roomId, roomName, transmissionID, transmissionIDs } = action.payload
            console.log("updating room name...", roomName)
            try {
                if (transmissionIDs?.includes(transmissionID)) {return}
            } catch (error) {console.log(error)}
            // find room by id -> update name
            const activeRoomIdx = state.roomsData.findIndex(room => room.roomId === roomId)
            const room = state.roomsData[activeRoomIdx]
            const updatedRoom = { ...room, roomName: roomName}
            state.roomsData = [ ...state.roomsData.slice(0, activeRoomIdx), 
                                updatedRoom, 
                                ...state.roomsData.slice(activeRoomIdx+1) ]   
        }

    },

    extraReducers: (builder) => {

        // getRoomsByFirebaseUserId

        builder.addCase(getRoomsByFirebaseUserId.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getRoomsByFirebaseUserId.fulfilled, (state, action) => {
            state.loading = false
            state.roomsData = action.payload
            state.currentActiveRoomId =  action.payload[action.payload.length-1]?.roomId ? action.payload[action.payload.length-1]?.roomId : null
            // state.activeRoomIndex = state.roomsData.findIndex(roomObj => roomObj.roomId === state.currentActiveRoomId) || null
            state.error = null
        })
        builder.addCase(getRoomsByFirebaseUserId.rejected, (state, action) => {
            state.loading = false
            state.roomsData = null
            state.error = action.payload // The error message from rejectWithValue is set in the state
        })

        // getRoomsByMongoDbUserId
        builder.addCase(getRoomsByMongoDbUserId.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getRoomsByMongoDbUserId.fulfilled, (state, action) => {
            state.loading = false
            state.roomsData = action.payload
            if (state.activeRoom === null) {
                state.currentActiveRoomId = action.payload[action.payload.length-1]?.roomId ? action.payload[action.payload.length-1].roomId : null
            }
            // state.activeRoomIndex = state.roomsData.findIndex(roomObj => roomObj.roomId === state.currentActiveRoomId) || null
            state.error = null
        })
        builder.addCase(getRoomsByMongoDbUserId.rejected, (state, action) => {
            state.loading = false
            state.roomsData = action.payload
            state.error = action.payload // The error message from rejectWithValue is set in the state
        })

        // this will trigger the getRoomsByMongoDbUserId request to keep the state in sync with the backend
        // so no need to add pending and fulfilled case

        builder.addCase(createNewRoom.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createNewRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(createNewRoom.fulfilled, (state, action) => {
            // during operation this is followed by another promise
            // so updating the loading state to true will cause a 
            // momentary flash on the screen
            // state.loading = false 
            console.log("createNewRoom", action.payload)
            state.currentActiveRoomId = action.payload._id
            state.error = null
        })

        builder.addCase(addUsersToRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(addUsersToRoom.fulfilled, (state, action) => {
            // state.loading = false
            state.error = null
        })
        builder.addCase(addUsersToRoom.pending, (state, action) => {
            state.loading = true
        })

        // add room to rooms list
        builder.addCase(getNewRoomData.rejected, (state, action) => {
            // state.loading = false
            state.error = action.payload 
        })
        builder.addCase(getNewRoomData.fulfilled, (state, action) => {
            // state.loading = false
            // append new room to rooms array
            console.log("getting room data", action.payload)
            state.roomsData = [...state.roomsData, action.payload] || action.payload
        })
        builder.addCase(getNewRoomData.pending, (state, action) => {
            // state.loading = true
        })

        builder.addCase(removeUsersFromRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(removeUsersFromRoom.fulfilled, (state, action) => {
            // state.loading = false
            state.error = null
        })

        builder.addCase(updateRoomName.pending, (state) => {
            // state.loading = true
        })
        builder.addCase(updateRoomName.rejected, (state, action) => {
            state.loading = false
            // state.error = action.payload
            state.roomErrorLog = [ ...state.roomErrorLog,  {
                errorTitle: "Error Updating Group Name",
                alertTime: Date.now(),
                originalRoomName: action.payload.originalRoomName,
                newRoomName: action.payload.newRoomName,
                errorMessage: action.payload.error
            } ]
            // revert back to original name
            // find room by id -> update name
            const activeRoomIdx = state.roomsData.findIndex(room => room.roomId === action.payload.roomId)
            state.roomsData[activeRoomIdx].roomName = action.payload.originalRoomName
        })
        builder.addCase(updateRoomName.fulfilled, (state, action) => {
            // state.loading = false
            state.error = null
        })

        builder.addCase(updateRoomIcon.pending, (state) => {
            // state.loading = true
        })
        builder.addCase(updateRoomIcon.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
        builder.addCase(updateRoomIcon.fulfilled, (state, action) => {
            // state.loading = false
            state.error = null
        })

        builder.addCase(deleteRoom.pending, (state) => {
            // during operation this is followed by another promise
            // so updating the loading state to true will cause a 
            // momentary flash on the screen
            state.loading = true
        })
        builder.addCase(deleteRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            const roomId = action.payload.roomId
            const roomName = state.roomsData?.filter(room => room.roomId === roomId)[0].roomName
            state.roomErrorLog = {
                alertTitle: "Error Deleting Group",
                errorMessage: action.payload.error,
                roomName: roomName,
                alertTime: Date.now()
            }
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            // state.loading = false
            state.error = null
        })

    }
})


// const allRoomsData = (state) => state.rooms?.roomsData || []
// export const selectRoomById = createSelector(
//     [allRoomsData],
//     (allRoomsData) => (roomId) => {
//         if (allRoomsData, state => state.user) {
//             return ( allRoomsData?.filter(room => room.roomId === roomId) )
//         }
//         return false
//     }
// )


export const { 
        changeCurrentActiveRoom,
        assignCurrentActiveRoom,
        setLoading, 
        removeRoomFromRoomSlice,
        updateRoomNameReducer
    } = roomSlice.actions

export default roomSlice.reducer