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

        firebaseUserId: build.query({
            query: (firebaseUserId) => ({
                url: `/firebase/${firebaseUserId}`,
                method: 'GET',
            }),
        }),

        updateUsername: build.mutation({
            query: ({userId, newUsername}) => ({
                url: `/updateUsername/${userId}`,
                method: 'PATCH',
                body: newUsername
            })
        }),

        deleteUser: build.mutation({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'DELETE',
            })
        }),

        getMessage: build.query({
            query: () => ({
                url: '/create',
                method: 'GET',
            }),
        }),

    }),
})

export const { 
    useCreateNewUserMutation, 
    useGetUserByMongoDBUserIdQuery,
    useFirebaseUserIdQuery,
    useUpdateUsernameMutation,
    useDeleteUserMutation,
    useGetMessageQuery
} = userApi;
