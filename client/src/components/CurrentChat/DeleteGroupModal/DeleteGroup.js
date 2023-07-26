import { useState } from 'react';
import './DeleteGroup.css';
import InputField from '../../InputField/InputField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const DeleteGroup = ({deleteGroupModalVisible, setDeleteGroupModalVisible}) => {

    const [groupName, setGroupName] = useState('')

    const closePopup = () => {
        setDeleteGroupModalVisible(false)
        setGroupName('')
    }

    const deleteGroup = () => {
        setDeleteGroupModalVisible(false)
        setGroupName('')
    }

    return (
        <div className={`modal-background ${deleteGroupModalVisible ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Delete Group</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details group-name'>
                    <p className='delete-group__message'>
                        PRESS DELETE TO CONFIRM DELETION. <br/> THIS ACTION CANNOT BE UNDONE.
                    </p>
                </div>

                <button className='close-popup-button delete-group__button' onClick={deleteGroup} style={{marginBottom: "5px"}}>Delete Forever</button>
            </div>
        </div>
    );
}

export default DeleteGroup;