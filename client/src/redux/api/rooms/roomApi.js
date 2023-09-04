import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseURL = 'https://server-boisterous-sunburst-f3d32f.onrender.com/api'
const baseURL = process.env.PRODUCTION_BASE_URL

export const roomApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rooms` }),
    endpoints: (build) => ({

        createNewRoom: build.mutation({
            query: ({userId, roomName, membersArray}) => ({
                url: `/create/${userId}`,
                method: 'POST',
                body: { roomName, membersArray }
            })
        }),

        getRoom: build.query({
            query: (roomId) => ({
                url: `/${roomId}`,
                method: 'GET',
            }),
        }),

        addUsersToRoom: build.mutation({
            query: ({roomId, emailsArray}) => ({
                url: `/addUser/${roomId}`,
                method: 'PATCH',
                body: { 
                    emailsArray 
                }
            }),
        }),

        removeUsersFromRoom: build.mutation({
            query: ({roomId, emailsArray}) => ({
                url: `/removeUser/${roomId}`,
                method: 'PATCH',
                body: {
                    emailsArray
                }
            })
        }),

        updateRoomName: build.mutation({
            query: ({roomId, newRoomName}) => ({
                url: `/${roomId}`,
                method: 'PATCH',
                body: {newRoomName}
            })
        }),

        deleteRoom: build.mutation({
            query: ({roomId}) => ({
                url: `/${roomId}`,
                method: 'DELETE',
            })
        }),

        

    }),
})

export const { 
    useCreateNewRoomMutation, 
    useGetRoomQuery,
    useAddUserToRoomMutation,
    useRemoveUserFromRoomMutation,
    useUpdateRoomNameMutation,
    useDeleteRoomMutation
} = roomApi;
