import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputField from '../../InputField/InputField';


const UpdateGroupNameModal = ({updateGroupNamePopupVisible, setUpdateGroupNamePopupVisible}) => {

    const [groupName, setGroupName] = useState('Current Group Name')

    const closePopup = () => {
        setUpdateGroupNamePopupVisible(false)
        setGroupName('')
    }

    const createGroup = () => {
        setUpdateGroupNamePopupVisible(false)
        setGroupName('')
    }

    return (
        <div className={`modal-background ${updateGroupNamePopupVisible ? null : "hide-page"}`}>
            <div className="create-new-group">
                <h3>Update Group Name</h3>
                <div className='close-icon'>
                    <CloseRoundedIcon
                        onClick={closePopup}
                    />
                </div>

                <div className='create-new-group__details group-name'>
                    <InputField
                        value={groupName}
                        setValue={setGroupName}
                        required={true}
                    />
                </div>

                <button className='close-popup-button' onClick={createGroup}>Update</button>
            </div>
        </div>
    );
}

export default UpdateGroupNameModal;