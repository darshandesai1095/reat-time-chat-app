import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { userApi } from './api/auth/authApi'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer
    },

    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(userApi.middleware)
    )
})

setupListeners(store.dispatch)