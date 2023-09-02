import { useState } from 'react';
import './AddMoreUsersModal.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputField from '../../InputField/InputField';
import addUsersToRoomAndSyncData from '../../../functions/rooms/addUsersToRoomAndSyncData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowAddMoreUsersModal } from '../../../redux/features/modals/modalSlice';

const AddMoreUsersModal = ({mongoDbUserId, activeRoomId}) => {

    const dispatch = useDispatch()
    const showAddMoreUsersModal = useSelector(state => state.modals.showAddMoreUsersModal)
    const username = useSelector(state => state.user.username)
    const userId = useSelector(state => state.user.mongoDbUserId)


    const [emails, setEmails] = useState([''])
    const handleAddMore = () => {
        setEmails([...emails, ''])
    }

    const closePopup = () => {
        dispatch(toggleShowAddMoreUsersModal())
        setEmails([''])
    }

    const handleUpdateUsers = async () => {
        dispatch(toggleShowAddMoreUsersModal())
        try {
            // if user not in removedrooms list, do below, else
            await addUsersToRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId, 
                                                            emails, userId, username)
        } catch (error) {
            alert("Error adding users!")
        }
        setEmails([''])
    }

    return (
        <div className={`modal-background ${showAddMoreUsersModal ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Add Users</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details'>
                    {/* <p>USER EMAIL</p> */}
                    {emails.map( (email, i) => {
                        return (
                            <div className='email-input-field' key={i}>

                                <InputField
                                    // key={i}
                                    value={emails[i]}
                                    setValue={(newValue) => {
                                        const updatedEmails = [...emails]
                                        updatedEmails[i] = newValue
                                        setEmails(updatedEmails)
                                    }}
                                    required={false}
                                    placeholder={"Enter user email"}
                                />

                            </div>
      
                        )
                    })}
                </div>

                <p className='add-more' onClick={handleAddMore}>Add more</p>

                <button className='close-popup-button' onClick={handleUpdateUsers}>Add To Group</button>
            </div>
        </div>
    );
}

export default AddMoreUsersModal;