import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './api/users/userApi'
import { roomApi } from './api/rooms/roomApi'
import userReducer from './features/users/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        // room: roomReducer,
        [roomApi.reducerPath]: roomApi.reducer
    },

    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
          userApi.middleware, 
          roomApi.middleware
        )
    )
})

setupListeners(store.dispatch)