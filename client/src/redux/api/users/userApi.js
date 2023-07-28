import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/users' }),
    endpoints: (build) => ({

        createNewUser: build.mutation({
            query: (userData) => ({
                url: '/create',
                method: 'POST',
                body: userData
            })
        }),

        getUserByMongoDBUserId: build.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
        }),

        getUserByFirebaseUserId: build.query({
            query: (firebaseUserId) => ({
                url: `/firebase/${firebaseUserId}`,
                method: 'GET',
            }),
        }),

        updateUsername: build.mutation({
            query: ({userId, newUsername}) => ({
                url: `/updateUsername/${userId}`,
                method: 'PATCH',
                body: { newUsername }
            })
        }),

        deleteUser: build.mutation({
            query: (userId) => ({ //mongoDbId
                url: `/${userId}`,
                method: 'DELETE',
            })
        }),

        

    }),
})

export const { 
    useCreateNewUserMutation, 
    useGetUserByMongoDBUserIdQuery,
    useGetUserByFirebaseUserIdQuery,
    useUpdateUsernameMutation,
    useDeleteUserMutation,
    useGetMessageQuery
} = userApi;