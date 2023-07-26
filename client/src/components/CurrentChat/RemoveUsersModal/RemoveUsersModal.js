import { useState } from 'react';
import './RemoveUsersModal.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';



const RemoveUsersModal = ({removeUsersModalVisible, setRemoveUsersModalVisible}) => {

    const [emails, setEmails] = useState([''])
    const handleAddMore = () => {
        setEmails([...emails, ''])
    }

    const closePopup = () => {
        setRemoveUsersModalVisible(false)
        setRemovedUsers([])
    }

    const handleUpdateUsers = () => {
        setRemoveUsersModalVisible(false)
        setRemovedUsers([])
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
    

    const usersList = ["user_1", "user_2", "user_3", "user_4", "user_5", "user_6", "user_7"]

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
                        usersList.map( (user, i) => {
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