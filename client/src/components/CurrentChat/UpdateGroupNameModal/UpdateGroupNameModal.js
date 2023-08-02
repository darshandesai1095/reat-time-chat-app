import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputField from '../../InputField/InputField';
import renameRoomAndSyncData from '../../../functions/rooms/renameRoomAndSyncData';
import { useDispatch , useSelector} from 'react-redux';
import LoadingModal from '../../AllChats/LoadingModal/LoadingModal';


const UpdateGroupNameModal = ({updateGroupNamePopupVisible, setUpdateGroupNamePopupVisible, activeRoomId, mongoDbUserId, roomName}) => {

    const dispatch  = useDispatch()
    const isLoading  = useSelector(state => state.rooms.loading)

    const [groupName, setGroupName] = useState('')

    const closePopup = () => {
        setUpdateGroupNamePopupVisible(false)
        setGroupName('')
    }

    const updateGroupName = async () => {
        if (!groupName || groupName.trim() == "") return alert("Room name cannot be blank")
        
        try {
            await renameRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId, groupName)
        } catch (error) {
            alert("Error updating group name!")
        }
        setUpdateGroupNamePopupVisible(false)
        setGroupName('')
    }

    return (
        <>
        {
            isLoading ?

            <LoadingModal/>

            :

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
                            placeholder={roomName}
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