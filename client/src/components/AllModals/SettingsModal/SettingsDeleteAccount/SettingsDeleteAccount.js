import './SettingsDeleteAccount.css';
import { toggleShowSettingsModal } from '../../../../redux/features/modals/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../redux/features/users/userSlice';


const SettingsDeleteAccount = ({ handleNavigation, modalTitle, buttonDescription }) => {

  
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.mongoDbUserId)
    const handleDeleteAccount = async () => {
        // dispatch action to send patch request
        dispatch(toggleShowSettingsModal())
        try {
            await Promise.resolve( dispatch(deleteUser(userId)) )
        } catch (error) {
            alert("Error deleting account!")
        }
        handleNavigation('/settings')
    }


    return (
        <>
            <h3 className='settings-header'>
                {modalTitle}
            </h3>

            <p className='delete-group__message'>
                This action cannot be undone. 
                <br/>
                Press below to confirm deletion.
            </p>


            <button 
                className='close-popup-button delete-account' 
                onClick={handleDeleteAccount}>
                    {buttonDescription}
            </button>

        </>

        
    );
}

export default SettingsDeleteAccount;