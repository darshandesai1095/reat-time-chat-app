import './DeleteGroup.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSelector, useDispatch } from 'react-redux';
import deleteRoomAndSyncData from '../../../functions/rooms/deleteRoomAndSyncData';
import LoadingModal from '../../AllChats/LoadingModal/LoadingModal';

const DeleteGroup = ({deleteGroupModalVisible, setDeleteGroupModalVisible, activeRoomId, mongoDbUserId}) => {

    const isLoading  = useSelector(state => state.rooms.loading)
    const dispatch = useDispatch()

    const closePopup = () => {
        setDeleteGroupModalVisible(false)
    }

    const deleteGroup = async () => {
        try {
            await deleteRoomAndSyncData(dispatch, activeRoomId, mongoDbUserId)
        } catch (error) {
            alert("Error updating group name!")
        }
        setDeleteGroupModalVisible(false)
    }

    return (

        <>
        {
            isLoading ?

            <LoadingModal/>

            :

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
                            Press delete to confirm deletion. <br/> This action cannot be undone.
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