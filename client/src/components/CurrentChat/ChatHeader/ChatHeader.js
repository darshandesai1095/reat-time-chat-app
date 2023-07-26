import './ChatHeader.css';
import { useState } from 'react';
import UpdateGroupNameModal from '../UpdateGroupNameModal/UpdateGroupNameModal';
import AddMoreUsersModal from '../AddMoreUsersModal/AddMoreUsersModal';
import RemoveUsersModal from '../RemoveUsersModal/RemoveUsersModal';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import DeleteGroup from '../DeleteGroupModal/DeleteGroup';

const ChatHeader = ({}) => {

    const [updateGroupNamePopupVisible, setUpdateGroupNamePopupVisible] = useState(false)
    const [updateAddUsersModalVisible, setUpdateAddUsersModalVisible] = useState(false)
    const [removeUsersModalVisible, setRemoveUsersModalVisible] = useState(false)
    const [deleteGroupModalVisible, setDeleteGroupModalVisible] = useState(false)

    return (
        <>
        
        <UpdateGroupNameModal
            updateGroupNamePopupVisible={updateGroupNamePopupVisible}
            setUpdateGroupNamePopupVisible={setUpdateGroupNamePopupVisible}
        />

        <AddMoreUsersModal
            updateAddUsersModalVisible={updateAddUsersModalVisible}
            setUpdateAddUsersModalVisible={setUpdateAddUsersModalVisible}
        
        />

        <RemoveUsersModal
            removeUsersModalVisible={removeUsersModalVisible}
            setRemoveUsersModalVisible={setRemoveUsersModalVisible}
        
        />

        <DeleteGroup
            deleteGroupModalVisible={deleteGroupModalVisible}
            setDeleteGroupModalVisible={setDeleteGroupModalVisible}
        />



        <div className='chat-header'>

            <div className='chat-header__group-info'>

                <div className='chat-header__avatar'>
                    <img src='man.png'/>
                </div>

                <div className='chat-header__meta-data'>
                    <h3 className='meta-data__group-name'>
                        Group Name
                    </h3>
                    <p className='meta-data__members'>
                        10 members
                    </p>
                </div>

            </div>


            <div className='chat-header__menu'>
                <CreateRoundedIcon
                    onClick={() => setUpdateGroupNamePopupVisible(true)}
                />
                <AddCircleRoundedIcon
                    onClick={() => setUpdateAddUsersModalVisible(true)}
                />
                <RemoveCircleRoundedIcon
                    onClick={() => setRemoveUsersModalVisible(true)}
                />
                <DisabledByDefaultRoundedIcon
                    onClick={() => setDeleteGroupModalVisible(true)}
                />
            </div>

        </div>
        </>
    )
}

export default ChatHeader;
