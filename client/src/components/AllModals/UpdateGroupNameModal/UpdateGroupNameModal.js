import { useState } from 'react';
import InputField from '../../InputField/InputField';
import renameRoomAndSyncData from '../../../functions/rooms/renameRoomAndSyncData';
import { useDispatch , useSelector} from 'react-redux';
import LoadingModal from '../../AllModals/LoadingModal/LoadingModal';
import '../AddMoreUsersModal/AddMoreUsersModal.css'
import { toggleShowUpdateGroupNameModal } from '../../../redux/features/modals/modalSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const UpdateGroupNameModal = ( {activeRoomId, mongoDbUserId, roomName} ) => {

    const dispatch  = useDispatch()
    const showUpdateGroupNameModal = useSelector(state => state.modals.showUpdateGroupNameModal)
    const isLoading  = useSelector(state => state.rooms.loading)
    const username = useSelector(state => state.user.username)
    const originalRoomName = roomName

    const [groupName, setGroupName] = useState('')

    const closePopup = () => {
        dispatch(toggleShowUpdateGroupNameModal())
        setGroupName('')
    }

    const updateGroupName = async () => {
        
        if (!groupName || groupName.trim() === "") return alert("Room name cannot be blank")
        
        try {
            await renameRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId, groupName, username, originalRoomName)
        } catch (error) {
            alert("Error updating group name!")
        }
        dispatch(toggleShowUpdateGroupNameModal())
        setGroupName('')
    }

    return (
        <>
        {
            isLoading ?

            <LoadingModal/>

            :

            <div className={`modal-background ${showUpdateGroupNameModal ? null : "hide-page"}`}>
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
                            placeholder="Enter new name"
                        />
                    </div>

                    <button className='close-popup-button' onClick={updateGroupName}>Update</button>
                </div>
            </div>
        }
        </>
    );
}

export default UpdateGroupNameModal;