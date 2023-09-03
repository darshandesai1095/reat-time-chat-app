import { useState } from 'react';
import Avatar from '../../../Avatar/Avatar'
import './SettingsUpdateProfilePic.css';
import imagesArray from '../../../../imagesArray';
import { useDispatch, useSelector } from 'react-redux';
import updateProfilePictureAndSyncData from '../../../../functions/users/updateProfilePictureAndSyncData';
import { toggleShowSettingsModal } from '../../../../redux/features/modals/modalSlice';


const SettingsUpdateProfilePic = ({ handleNavigation, modalTitle, buttonDescription }) => {

    const currentProfilePictureUrl = useSelector(state => state.user.profilePictureUrl)
    const [selectedPictureUrl, setSelectedPictureUrl] = useState(currentProfilePictureUrl)

    // const numberArray = Array.from({ length: 100 }, (_, index) => index + 1)
    const avatars = imagesArray.map((url, i) => {
        return (
            <Avatar
                key={i}
                url={url}
                width={60}
                height={60}
                responsive={true}
                handleClick={null}
                isSelectedPicture={selectedPictureUrl === url ? true : false}
                setSelectedPictureUrl={setSelectedPictureUrl}
            />
        )
    })

    const userId = useSelector(state => state.user.mongoDbUserId)
    const dispatch = useDispatch()
    const updateProfilePicture = async () => {
        // dispatch action to send patch request
        dispatch(toggleShowSettingsModal())
        try {
            await updateProfilePictureAndSyncData(dispatch, userId, selectedPictureUrl)
        } catch (error) {
            alert("Error updating group name!")
        }
        handleNavigation('/settings')
    }


    return (
        <>
            <h3 className='settings-header'>
                {modalTitle}
            </h3>

            <div className='update-profile-picture__avatars'>
                { avatars }
            </div>

            <button 
                className='close-popup-button' 
                onClick={updateProfilePicture}>
                    {buttonDescription}
            </button>

        </>

        
    );
}

export default SettingsUpdateProfilePic;