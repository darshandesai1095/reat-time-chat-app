import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from './features/users/userSlice'
import { userApi } from './api/users/userApi'
import roomReducer from './features/rooms/roomSlice'
import { roomApi } from './api/rooms/roomApi'
import chatLogReducer from './features/chatLogs/chatLogSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        rooms: roomReducer,
        chatLog: chatLogReducer
    },

    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
          userApi.middleware, 
          // roomApi.middleware
        )
    )
})

setupListeners(store.dispatch)