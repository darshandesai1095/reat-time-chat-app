import { useState } from 'react';
import './RemoveUsersModal.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import removeUsersFromRoomAndSyncData from '../../../functions/rooms/removeUsersFromRoomAndSyncData';
import { useDispatch } from 'react-redux';


const RemoveUsersModal = ({removeUsersModalVisible, setRemoveUsersModalVisible, mongoDbUserId, activeRoomId, usersList}) => {

    const dispatch = useDispatch()

    const closePopup = () => {
        setRemoveUsersModalVisible(false)
        setRemovedUsers([])
    }

    const handleUpdateUsers = async () => {
        setRemoveUsersModalVisible(false)
        setRemovedUsers([])
        try {
            await removeUsersFromRoomAndSyncData(dispatch, mongoDbUserId, activeRoomId, removedUsers)
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
        <div className={`modal-background ${removeUsersModalVisible ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Remove Users</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details remove-user__users-list'>
                    {
                        usersListArr.map( (user, i) => {
                            return (
                                <div className='remove-user__user'>
                                    <p className={`${removedUsers.includes(user) && "strikethrough"}`}>
                                        {user}
                                    </p>
                                    {   removedUsers.includes(user) ?
                                        <UndoRoundedIcon
                                            onClick={() => undoRemoveUser(user)}
                                        />
                                        :
                                        <DeleteRoundedIcon
                                            onClick={() => addToRemovedUsersList(user)}
                                        />
                                    }
            
                                </div>
      
                            )
                        })
                    }
                </div>

                <button className='close-popup-button remove-users-button' onClick={handleUpdateUsers}>Update Users List</button>
            </div>
        </div>
    );
}

export default RemoveUsersModal;