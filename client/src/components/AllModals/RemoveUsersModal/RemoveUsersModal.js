import { useState } from 'react';
import './RemoveUsersModal.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import removeUsersFromRoomAndSyncData from '../../../functions/rooms/removeUsersFromRoomAndSyncData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowRemoveUsersModal } from '../../../redux/features/modals/modalSlice';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const RemoveUsersModal = ({mongoDbUserId, activeRoomId, usersList}) => {

    const dispatch = useDispatch()
    const showRemoveUsersModal = useSelector(state => state.modals.showRemoveUsersModal)
    const username = useSelector(state => state.user.username)


    const closePopup = () => {
        dispatch(toggleShowRemoveUsersModal())
        setRemovedUsers([])
    }

    const handleUpdateUsers = async () => {
        dispatch(toggleShowRemoveUsersModal())
        setRemovedUsers([])
        try {
            await removeUsersFromRoomAndSyncData(dispatch, mongoDbUserId, activeRoomId, removedUsers, username)
        } catch (error) {
            alert("Error updating group name!")
        }
    }

    const [removedUsers, setRemovedUsers] = useState([])
    const addToRemovedUsersList = (user) => {
        const removedUsersList = [...removedUsers, user]
        setRemovedUsers(removedUsersList)
    }

    const undoRemoveUser = (user) => {
        const undoIndex = removedUsers.indexOf(user)
        const removedUsersList = [...removedUsers]
        removedUsersList.splice(undoIndex, 1)
        setRemovedUsers(removedUsersList)
    }
    
    const usersListArr = usersList ? usersList.map(user => user.email) : []

    return (
        <div className={`modal-background ${showRemoveUsersModal ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Remove Users</h3>
                <div className='close-icon'>
                    <CancelRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details remove-user__users-list'>
                    {
                        usersListArr.map( (user, i) => {
                            return (
                                <div className='remove-user__user' key={i}>
                                    <p className={`${removedUsers.includes(user) && "strikethrough"}`}>
                                        {user}
                                    </p>
         
                                        {   removedUsers.includes(user) ?
                                            <div className='remove-user__icon undo'
                                                onClick={() => undoRemoveUser(user)}
                                            >
                                                <UndoRoundedIcon/>
                                            </div>
                                            :
                                            <div className='remove-user__icon bin'  
                                                onClick={() => addToRemovedUsersList(user)}>
                                                <DeleteRoundedIcon/>
                                            </div>
                                        }
                        
            
                                </div>
      
                            )
                        })
                    }
                </div>

                <button className='close-popup-button remove-users-button' onClick={handleUpdateUsers}>Update List</button>
            </div>
        </div>
    );
}

export default RemoveUsersModal;