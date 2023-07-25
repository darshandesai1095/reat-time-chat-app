import './AllChatsHeader.css';
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AllChatsHeader = ({setShowCreateGroupPopup}) => {

    return (
        <div className="all-chats-header" >
            <h3>Messages</h3>
            <div>
                <AddCircleOutlineIcon
                    onClick={() => setShowCreateGroupPopup(true)}
                />
            </div>
        </div>
    )
}

export default AllChatsHeader;