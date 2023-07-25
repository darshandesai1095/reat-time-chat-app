import './AllChats.css';
import { useState } from 'react';
import AllChatsBody from './AllChatsBody/AllChatsBody';
import AllChatsHeader from './AllChatsHeader/AllChatsHeader';
import CreateNewGroupModal from './CreateNewGroupModal/CreateNewGroupModal';

const AllChats = ({}) => {

    const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false)
    const handleCreateNewGroup = () => {
        setShowCreateGroupPopup(false)
    }
    const handleCancelCreateGroup = () => {
        setShowCreateGroupPopup(false)
    }

    return (
        <div className="all-chats" >
            <AllChatsHeader
                setShowCreateGroupPopup={setShowCreateGroupPopup}
            />
            <AllChatsBody/>

            <CreateNewGroupModal
                showCreateGroupPopup={showCreateGroupPopup}
                handleCancelCreateGroup={handleCancelCreateGroup}
                handleCreateNewGroup={handleCreateNewGroup}
            />
        </div>
    )
}

export default AllChats;