import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from './features/users/userSlice'
import { userApi } from './api/users/userApi'
import roomReducer from './features/rooms/roomSlice'
import chatLogsReducer from './features/chatLogs/chatLogSlice'
import modalReducer from './features/modals/modalSlice'
import activityLogReducer from './features/activityLogs/activityLogSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        rooms: roomReducer,
        chatLogs: chatLogsReducer,
        modals: modalReducer,
        activityLog: activityLogReducer
    },

    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
          userApi.middleware
        )
    )
})

setupListeners(store.dispatch)