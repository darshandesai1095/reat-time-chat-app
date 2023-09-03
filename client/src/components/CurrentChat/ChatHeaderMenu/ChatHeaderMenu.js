import './ChatHeaderMenu.css';
import { useState } from 'react';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import GroupRemoveRoundedIcon from '@mui/icons-material/GroupRemoveRounded';
import DoorFrontRoundedIcon from '@mui/icons-material/DoorFrontRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { toggleShowAddMoreUsersModal, toggleShowDeleteGroupModal, toggleShowLeaveGroupModal, toggleShowRemoveUsersModal, toggleShowUpdateGroupNameModal } from '../../../redux/features/modals/modalSlice';


const ChatHeaderMenu = () => {


    const [dropdownVisible, setDropdownVisible] = useState(false)
    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev)
    }

    const dispatch = useDispatch()
    const handleToggleGroupNameModal = () => {
        setDropdownVisible(false)
        dispatch(toggleShowUpdateGroupNameModal())
    }
    const handleToggleAddMoreUsersModal = () => {
        setDropdownVisible(false)
        dispatch(toggleShowAddMoreUsersModal())
    }
    const handleToggleRemoveUsersModal = () => {
        setDropdownVisible(false)
        dispatch(toggleShowRemoveUsersModal())
    }

    const handleToggleDeleteGroupModal = () => {
        setDropdownVisible(false)
        dispatch(toggleShowDeleteGroupModal())
    }
    const handleToggleLeaveGroupModal = () => {
        setDropdownVisible(false)
        dispatch(toggleShowLeaveGroupModal())
    }

    return (

        <div className='chat-header-menu'>

            <div className='icon-padding'>
                <PendingRoundedIcon
                    className={dropdownVisible ? "rot45deg" : "rot0deg"}
                    onClick={toggleDropdown}
                />
            </div>

            <div className={`menu__dropdown ${dropdownVisible ? "show" : "hide"}`}>
                
                <div className='dropdown__item'
                    onClick={handleToggleGroupNameModal}
                >
                    <EditRoundedIcon/>
                    <p>Rename Group</p>
                </div>

                <div className='dropdown__item'
                    onClick={handleToggleAddMoreUsersModal}
                >
                    <GroupAddRoundedIcon/>
                    <p>Add Users</p>
                </div>

                <div className='dropdown__item'
                    onClick={handleToggleRemoveUsersModal}
                >
                    <GroupRemoveRoundedIcon/>
                    <p>Remove Users</p>
                </div>

                <div className='dropdown__item'
                    onClick={handleToggleLeaveGroupModal}
                >
                    <DoorFrontRoundedIcon/>
                    <p>Leave Group</p>
                </div>

                <div className='dropdown__item'
                    onClick={handleToggleDeleteGroupModal}
                >
                    <DeleteRoundedIcon/>
                    <p>Delete Group</p>
                </div>
            </div>

        </div>

    )
}

export default ChatHeaderMenu;