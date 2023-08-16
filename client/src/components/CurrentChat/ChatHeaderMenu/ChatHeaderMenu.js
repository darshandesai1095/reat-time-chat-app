import './ChatHeaderMenu.css';
import { useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import GroupRemoveRoundedIcon from '@mui/icons-material/GroupRemoveRounded';
import DoorFrontRoundedIcon from '@mui/icons-material/DoorFrontRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';




const ChatHeaderMenu = ({ setUpdateGroupNamePopupVisible, setUpdateAddUsersModalVisible, setRemoveUsersModalVisible, setDeleteGroupModalVisible }) => {


    const [dropdownVisible, setDropdownVisible] = useState(false)
    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev)
    }

    return (

        <div className='chat-header-menu'>
            {/* <CreateRoundedIcon
                className={menuIconsVisible ? "visible" : "hidden"}
                onClick={() => setUpdateGroupNamePopupVisible(true)}
            />
            <AddCircleRoundedIcon
                className={menuIconsVisible ? "visible" : "hidden"}
                onClick={() => setUpdateAddUsersModalVisible(true)}
            />
            <RemoveCircleRoundedIcon
                className={menuIconsVisible ? "visible" : "hidden"}            
                onClick={() => setRemoveUsersModalVisible(true)}
            />
            <DeleteIcon
                className={menuIconsVisible ? "visible" : "hidden"}            
                onClick={() => setDeleteGroupModalVisible(true)}
            /> */}

            {/* <PendingRoundedIcon 
                className={menuIconsVisible ? "visible" : "hidden"}
                onClick={toggleMenu}
            /> */}

            <div className='icon-padding'>
                <PendingRoundedIcon
                    className={dropdownVisible ? "rot45deg" : "rot0deg"}
                    onClick={toggleDropdown}
                />
            </div>

            <div className={`menu__dropdown ${dropdownVisible ? "show" : "hide"}`}>
                <div className='dropdown__item'>
                    <EditRoundedIcon/>
                    <p>Rename Group</p>
                </div>
                <div className='dropdown__item'>
                    <GroupAddRoundedIcon/>
                    <p>Add Users</p>
                </div>
                <div className='dropdown__item'>
                    <GroupRemoveRoundedIcon/>
                    <p>Remove Users</p>
                </div>
                <div className='dropdown__item'>
                    <DoorFrontRoundedIcon/>
                    <p>Leave Group</p>
                </div>
                <div className='dropdown__item'>
                    <DeleteRoundedIcon/>
                    <p>Delete Group</p>
                </div>
            </div>

        </div>

    )
}

export default ChatHeaderMenu;
