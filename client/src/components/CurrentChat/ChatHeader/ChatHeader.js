import './ChatHeader.css';
import { useEffect, useState } from 'react';
import UpdateGroupNameModal from '../UpdateGroupNameModal/UpdateGroupNameModal';
import AddMoreUsersModal from '../AddMoreUsersModal/AddMoreUsersModal';
import RemoveUsersModal from '../RemoveUsersModal/RemoveUsersModal';
import DeleteGroup from '../DeleteGroupModal/DeleteGroup';
import ChatHeaderMenu from '../ChatHeaderMenu/ChatHeaderMenu';
import { useSelector } from 'react-redux';


const ChatHeader = ({}) => {

    const roomId = useSelector(state => state.rooms.currentActiveRoomId)
    const roomsData = useSelector(state => state.rooms.roomsData)
    const currentActiveRoomIndex = roomsData?.findIndex(room => room.roomId == roomId)
    const mongoDbUserId = useSelector(state => state.user.mongoDbUserId)
    const isLoading  = useSelector(state => state.rooms.loading)


    const numberOfMembers = roomsData ? roomsData[currentActiveRoomIndex]?.roomUsers?.length : null

    const displayNumberOfMembers = (numberOfMembers = null) => {
        if (numberOfMembers === null || numberOfMembers === undefined) {
            return (
                <p className='meta-data__members'>
                Loading...
                </p>
            )
        }
        if (numberOfMembers == 1) {
            return (
                <p className='meta-data__members'>
                    1 Member
                </p>
            )
        }
        return (
            <p className='meta-data__members'>
                {numberOfMembers} Members
            </p>
        )
    }

    const [updateGroupNamePopupVisible, setUpdateGroupNamePopupVisible] = useState(false)
    const [updateAddUsersModalVisible, setUpdateAddUsersModalVisible] = useState(false)
    const [removeUsersModalVisible, setRemoveUsersModalVisible] = useState(false)
    const [deleteGroupModalVisible, setDeleteGroupModalVisible] = useState(false)

    return (
        <>
        
        <UpdateGroupNameModal
            updateGroupNamePopupVisible={updateGroupNamePopupVisible}
            setUpdateGroupNamePopupVisible={setUpdateGroupNamePopupVisible}
            activeRoomId={roomId || null}
            activeRoomIndex={currentActiveRoomIndex || null}
            mongoDbUserId={mongoDbUserId || null}
            roomName={roomsData ? roomsData[currentActiveRoomIndex]?.roomName : null}
        />

        <AddMoreUsersModal
            updateAddUsersModalVisible={updateAddUsersModalVisible}
            setUpdateAddUsersModalVisible={setUpdateAddUsersModalVisible}
            activeRoomId={roomId || null}
            mongoDbUserId={mongoDbUserId || null}
        />

        <RemoveUsersModal
            removeUsersModalVisible={removeUsersModalVisible}
            setRemoveUsersModalVisible={setRemoveUsersModalVisible}
            activeRoomId={roomId || null}
            mongoDbUserId={mongoDbUserId || null}
            usersList={roomsData ? roomsData[currentActiveRoomIndex].roomUsers : null}
        />

        <DeleteGroup
            deleteGroupModalVisible={deleteGroupModalVisible}
            setDeleteGroupModalVisible={setDeleteGroupModalVisible}
            activeRoomId={roomId || null}
            mongoDbUserId={mongoDbUserId || null}
        />



        <div className='chat-header'>

            <div className='chat-header__group-info'>

                <div className='chat-header__avatar'>
                    <img src='man.png'/>
                </div>

                <div className='chat-header__meta-data'>
                    {
                        isLoading ?

                        <h3 className='meta-data__group-name'>
                            Loading...
                        </h3>
                        :
                        <h3 className='meta-data__group-name'>
                            {roomsData ? roomsData[currentActiveRoomIndex]?.roomName : "Loading..."}
                        </h3>
                    }

                    {displayNumberOfMembers(numberOfMembers)}

                </div>

            </div>


           <ChatHeaderMenu
                setUpdateGroupNamePopupVisible={setUpdateGroupNamePopupVisible}
                setUpdateAddUsersModalVisible={setUpdateAddUsersModalVisible}
                setRemoveUsersModalVisible={setRemoveUsersModalVisible}
                setDeleteGroupModalVisible={setDeleteGroupModalVisible}
           />

        </div>
        </>
    )
}

export default ChatHeader;
