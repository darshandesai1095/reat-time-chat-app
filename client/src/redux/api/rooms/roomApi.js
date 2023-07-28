import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/rooms' }),
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
            query: (roomId) => ({
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
