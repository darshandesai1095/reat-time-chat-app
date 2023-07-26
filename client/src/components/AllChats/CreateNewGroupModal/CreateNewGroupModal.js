import { useState, useRef } from 'react';
import './CreateNewGroupModal.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputField from '../../InputField/InputField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


const CreateNewGroupModal = ({showCreateGroupPopup, handleCreateNewGroup, handleCancelCreateGroup}) => {

    const [groupName, setGroupName] = useState('')
    const [emails, setEmails] = useState([''])
    const handleAddMore = () => {
        setEmails([...emails, ''])
    }

    const closePopup = () => {
        handleCancelCreateGroup()
        setGroupName('')
        setEmails([''])
    }

    const createGroup = () => {
        handleCreateNewGroup()
        setGroupName('')
        setEmails([''])
    }

    return (
        <div className={`modal-background ${showCreateGroupPopup ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Create New Group</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details group-name'>
                    <p>
                        GROUP NAME
                    </p>
                    <InputField
                        value={groupName}
                        setValue={setGroupName}
                        required={true}
                    />
                </div>

                <div className='create-new-group__details'>
                    <p>ADD EMAIL</p>
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

                <button className='close-popup-button' onClick={createGroup}>Create</button>
            </div>
        </div>
    );
}

export default CreateNewGroupModal;