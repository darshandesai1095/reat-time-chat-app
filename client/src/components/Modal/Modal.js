import AddMoreUsersModal from '../AllModals/AddMoreUsersModal/AddMoreUsersModal';
import CreateNewGroupModal from '../AllModals/CreateNewGroupModal/CreateNewGroupModal';
import DeleteGroup from '../AllModals/DeleteGroupModal/DeleteGroup';
import LeaveGroupModal from '../AllModals/LeaveGroupModal/LeaveGroupModal';
import RemoveUsersModal from '../AllModals/RemoveUsersModal/RemoveUsersModal';
import SettingsModal from '../AllModals/SettingsModal/SettingsModal';
import UpdateGroupNameModal from '../AllModals/UpdateGroupNameModal/UpdateGroupNameModal';
import './Modal.css';
import { useSelector } from 'react-redux';
import ChangeGroupChatIconModal from '../AllModals/ChangeGroupChatIconModal/ChangeGroupChatIconModal';


const Modal = () => {

    const activeRoomId = useSelector(state => state.rooms.currentActiveRoomId)
    const roomsData = useSelector(state => state.rooms.roomsData)
    const currentActiveRoomIndex = roomsData?.findIndex(room => room.roomId === activeRoomId)
    const mongoDbUserId = useSelector(state => state.user.mongoDbUserId)
    const showChangeGroupIconModal = useSelector(state => state.modals.showChangeGroupIconModal)


    return (
        <>
            <CreateNewGroupModal/>

            {
                showChangeGroupIconModal ?
                <ChangeGroupChatIconModal
                    modalTitle="Select Group Icon"
                    buttonDescription="Update Icon"
                    activeRoomId={activeRoomId}
                /> : null

            }


            <UpdateGroupNameModal
                activeRoomId={activeRoomId}
                mongoDbUserId={mongoDbUserId || null}
                roomName={roomsData ? roomsData[currentActiveRoomIndex]?.roomName : null}
            />
            <AddMoreUsersModal
                activeRoomId={activeRoomId}
                mongoDbUserId={mongoDbUserId || null}
            />
            <RemoveUsersModal
                activeRoomId={activeRoomId}
                mongoDbUserId={mongoDbUserId || null}
                usersList={roomsData ? roomsData[currentActiveRoomIndex]?.roomUsers : null}
            />

            <LeaveGroupModal
                activeRoomId={activeRoomId}
                mongoDbUserId={mongoDbUserId || null}           
            />

            <DeleteGroup
                activeRoomId={activeRoomId}
                mongoDbUserId={mongoDbUserId || null}
            />

            <SettingsModal/>

            
        </>
    )
}

export default Modal