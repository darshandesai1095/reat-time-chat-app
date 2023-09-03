import { useState } from 'react';
import './ChangeGroupChatIconModal.css';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar';
import imagesArray from '../../../imagesArray';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { toggleShowChangeGroupIconModal } from '../../../redux/features/modals/modalSlice';
import updateRoomIconAndSyncData from '../../../functions/rooms/updateRoomIconAndSyncData';


const ChangeGroupChatIconModal = ({modalTitle, buttonDescription, activeRoomId}) => {

    const roomsData = useSelector(state => state.rooms.roomsData)
    const activeRoom = roomsData?.filter(room => room.roomId === activeRoomId)
    const currentGroupIconUrl = activeRoom[0]?.profilePictureUrl
    const [selectedPictureUrl, setSelectedPictureUrl] = useState(currentGroupIconUrl)
    const userId = useSelector(state => state.user.mongoDbUserId)

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

    const dispatch = useDispatch()
    const updateGroupIcon = async () => {
        // dispatch action to send patch request
        dispatch(toggleShowChangeGroupIconModal())
        try {
            await updateRoomIconAndSyncData(dispatch, activeRoomId, userId, selectedPictureUrl)
        } catch (error) {
            alert("Error updating group icon!")
        }
    }

    const showChangeGroupIconModal = useSelector(state => state.modals.showChangeGroupIconModal)
    const handleCloseModal = () => {
        dispatch(toggleShowChangeGroupIconModal())
        setSelectedPictureUrl(currentGroupIconUrl)
    }

    return (
        <div className={`modal-background ${ showChangeGroupIconModal ? null : "hide-page"}`}>
            
            <div className={`create-new-group settings change-group-icon`}>
                <div className='settings-header'>

                    <div className='close-icon'>
                        <CloseRoundedIcon
                            onClick={ handleCloseModal }
                        />
                    </div>
                </div>

                <div className='settings__body'>
                    <h3 className='settings-header'>
                        { modalTitle }
                    </h3>

                    <div className='update-profile-picture__avatars'>
                        { avatars }
                    </div>

                    <button 
                        className='close-popup-button' 
                        onClick={updateGroupIcon}>
                            { buttonDescription }
                    </button>
                </div>

        </div>
    </div>

        
    );
}

export default ChangeGroupChatIconModal;