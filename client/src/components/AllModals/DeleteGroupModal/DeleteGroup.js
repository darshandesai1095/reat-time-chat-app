import './DeleteGroup.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSelector, useDispatch } from 'react-redux';
import deleteRoomAndSyncData from '../../../functions/rooms/deleteRoomAndSyncData';
import LoadingModal from '../LoadingModal/LoadingModal';
import { toggleShowDeleteGroupModal } from '../../../redux/features/modals/modalSlice';
import { setLoading } from '../../../redux/features/rooms/roomSlice';


const DeleteGroup = ({activeRoomId, mongoDbUserId}) => {

    const isLoading  = useSelector(state => state.rooms.loading)
    const showDeleteGroupModal = useSelector(state => state.modals.showDeleteGroupModal)
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch()

    const closePopup = () => {
        dispatch(toggleShowDeleteGroupModal())
    }

    const deleteGroup = async () => {
        dispatch(toggleShowDeleteGroupModal())
        dispatch(setLoading())
        try {
            await deleteRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId, username)
        } catch (error) {
            alert("Error deleting group!")
        }

    }

    return (

        <>
        {
            isLoading ?

            <LoadingModal/>

            :

            <div className={`modal-background ${showDeleteGroupModal ? null : "hide-page"}`}>
                <div className="create-new-group">
                    <h3>Delete Group</h3>
                    <div className='close-icon'>
                        <CloseRoundedIcon
                            onClick={closePopup}
                        />
                    </div>

                    <div className='create-new-group__details group-name'>
                        <p className='delete-group__message'>
                            You are about to delete this group. <br/> This action cannot be undone.
                        </p>
                    </div>

                    <button className='close-popup-button delete-group__button' onClick={deleteGroup} style={{marginBottom: "5px"}}>Delete</button>
                </div>
            </div>

        }
        </>
    );
}

export default DeleteGroup;