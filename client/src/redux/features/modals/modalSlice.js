import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showLoadingModal: false,

    showChangeGroupIconModal: false,

    showCreateNewGroupModal: false,
    showUpdateGroupNameModal: false,

    showAddMoreUsersModal: false,
    showRemoveUsersModal: false,
    showLeaveGroupModal: false,

    showDeleteGroupModal: false,
    showSettingsModal: false
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleShowLoadingModal: (state) => {
            state.showLoadingModal = !state.showLoadingModal
        },

        toggleShowChangeGroupIconModal: (state) => {
            state.showChangeGroupIconModal = !state.showChangeGroupIconModal
        },

        toggleCreateNewGroupModal: (state) => {
            state.showCreateNewGroupModal = !state.showCreateNewGroupModal
        },
        toggleShowUpdateGroupNameModal: (state) => {
            state.showUpdateGroupNameModal = !state.showUpdateGroupNameModal
        },


        toggleShowAddMoreUsersModal: (state) => {
            state.showAddMoreUsersModal = !state.showAddMoreUsersModal
        },
        toggleShowRemoveUsersModal: (state) => {
            state.showRemoveUsersModal = !state.showRemoveUsersModal
        },
        toggleShowLeaveGroupModal: (state) => {
            state.showLeaveGroupModal = !state.showLeaveGroupModal
        },

        toggleShowDeleteGroupModal: (state) => {
            state.showDeleteGroupModal = !state.showDeleteGroupModal
        },
        toggleShowSettingsModal: (state) => {
            state.showSettingsModal = !state.showSettingsModal
        }
     
       
    }
})



export const { 

    toggleCreateNewGroupModal,
    
    toggleShowChangeGroupIconModal,

    toggleShowUpdateGroupNameModal,

    toggleShowAddMoreUsersModal,
    toggleShowRemoveUsersModal,
    toggleShowLeaveGroupModal,

    toggleShowDeleteGroupModal,
    toggleShowSettingsModal

} = modalSlice.actions

export default modalSlice.reducer