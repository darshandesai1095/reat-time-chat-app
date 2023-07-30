import './AllChats.css';
import { useState } from 'react';
import AllChatsBody from './AllChatsBody/AllChatsBody';
import AllChatsHeader from './AllChatsHeader/AllChatsHeader';
import CreateNewGroupModal from './CreateNewGroupModal/CreateNewGroupModal';

const AllChats = ({}) => {

    const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false)

    return (
        <div className="all-chats" >
            <AllChatsHeader
                setShowCreateGroupPopup={setShowCreateGroupPopup}
            />
            <AllChatsBody/>

            <CreateNewGroupModal
                showCreateGroupPopup={showCreateGroupPopup}
                setShowCreateGroupPopup={setShowCreateGroupPopup}
            />
        </div>
    )
}

export default AllChats;