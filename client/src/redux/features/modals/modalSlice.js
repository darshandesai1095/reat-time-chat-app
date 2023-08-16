import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showLoadingModal: false,
    showCreateNewGroupModal: false,
    showAddMoreUsersModal: false,

    showDeleteGroupModal: false,
    showRemoveUsersModal: false,
    showUpdateGroupNameModal: false
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleShowLoadingModal: (state) => {
            state.showLoadingModal = !state.showLoadingModal
        },
        toggleCreateNewGroupModal: (state) => {
            state.showCreateNewGroupModal = !state.showCreateNewGroupModal
        },
        toggleShowAddMoreUsersModal: (state) => {
            state.showAddMoreUsersModal = !state.showAddMoreUsersModal
        },

        toggleShowDeleteGroupModal: (state) => {
            state.showDeleteGroupModal = !state.showDeleteGroupModal
        },
        toggleShowRemoveUsersModal: (state) => {
            state.showRemoveUsersModal = !state.showRemoveUsersModal
        },
        toggleShowUpdateGroupNameModal: (state) => {
            state.showUpdateGroupNameModal = !state.showUpdateGroupNameModal
        }
    }
})



export const { 
   changeCurrentActiveRoom
} = modalSlice.actions

export default modalSlice.reducer