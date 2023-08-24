import './SettingsUpdateUsername.css';
import InputField from '../../../InputField/InputField'
import { useState } from 'react';
import { toggleShowSettingsModal } from '../../../../redux/features/modals/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import updateUsernameAndSyncData from '../../../../functions/users/updateUsernameAndSyncData';


const SettingsUpdateUsername = ({ handleNavigation, modalTitle, buttonDescription }) => {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.mongoDbUserId)
    const [username, setUsername] = useState("")
    const handleUpdateUsername = async () => {
        // dispatch action to send patch request
        dispatch(toggleShowSettingsModal())
        try {
            await updateUsernameAndSyncData(dispatch, userId, username)
        } catch (error) {
            alert("Error updating group name!")
        }
        handleNavigation('/settings')
        setUsername("")
    }


    return (
        <>
            <h3 className='settings-header'>
                {modalTitle}
            </h3>

            <InputField
                value={username}
                setValue={setUsername}
                required={true}
            />

            <button 
                className='close-popup-button' 
                onClick={handleUpdateUsername}>
                    {buttonDescription}
            </button>

        </>

        
    );
}

export default SettingsUpdateUsername;