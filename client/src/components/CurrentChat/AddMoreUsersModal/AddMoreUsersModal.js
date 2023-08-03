import { useState } from 'react';
import './AddMoreUsersModal.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputField from '../../InputField/InputField';
import addUsersToRoomAndSyncData from '../../../functions/rooms/addUsersToRoomAndSyncData';
import { useDispatch } from 'react-redux';


const AddMoreUsersModal = ({updateAddUsersModalVisible, setUpdateAddUsersModalVisible, mongoDbUserId, activeRoomId}) => {

    const dispatch = useDispatch()

    const [emails, setEmails] = useState([''])
    const handleAddMore = () => {
        setEmails([...emails, ''])
    }

    const closePopup = () => {
        setUpdateAddUsersModalVisible(false)
        setEmails([''])
    }

    const handleUpdateUsers = async () => {
        setUpdateAddUsersModalVisible(false)
        try {
            await addUsersToRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId, emails)
        } catch (error) {
            alert("Error adding users!")
        }
        setEmails([''])
    }

    return (
        <div className={`modal-background ${updateAddUsersModalVisible ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Add Users</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details'>
                    <p>USER EMAIL</p>
                    {emails.map( (email, i) => {
                        return (
                            <div className='email-input-field'>

                                <InputField
                                    key={i}
                                    value={emails[i]}
                                    setValue={(newValue) => {
                                        const updatedEmails = [...emails]
                                        updatedEmails[i] = newValue
                                        setEmails(updatedEmails)
                                    }}
                                    required={false}
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