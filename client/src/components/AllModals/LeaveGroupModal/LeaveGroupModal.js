import removeUsersFromRoomAndSyncData from '../../../functions/rooms/removeUsersFromRoomAndSyncData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowLeaveGroupModal } from '../../../redux/features/modals/modalSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const LeaveGroupModal = ({mongoDbUserId, activeRoomId}) => {

    const dispatch = useDispatch()
    const showLeaveGroupModal = useSelector(state => state.modals.showLeaveGroupModal)
    const { email, username} = useSelector(state => state.user)

    const closePopup = () => {
        dispatch(toggleShowLeaveGroupModal()) 
    }

    const handleLeaveGroup = async () => {
        dispatch(toggleShowLeaveGroupModal())
        try {
            await removeUsersFromRoomAndSyncData(dispatch, mongoDbUserId, activeRoomId, [email], username)
        } catch (error) {
            alert("Error updating group name!")
        }
    }


    return (
        <div className={`modal-background ${showLeaveGroupModal ? null : "hide-page"}`}>
        <div className="create-new-group">
            <h3>Leave Group</h3>
            <div className='close-icon'>
                <CloseRoundedIcon
                    onClick={closePopup}
                />
            </div>

            <div className='create-new-group__details group-name'>
                <p className='delete-group__message'>
                    You are about to leave this group. <br/> Select the button below to confirm.
                </p>
            </div>

            <button className='close-popup-button' onClick={handleLeaveGroup} style={{marginBottom: "5px"}}>Leave Group</button>
        </div>
    </div>
    );
}

export default LeaveGroupModal;