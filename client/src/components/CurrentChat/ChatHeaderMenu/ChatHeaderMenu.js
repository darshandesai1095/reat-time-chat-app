import './ChatHeaderMenu.css';
import { useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';


const ChatHeaderMenu = ({ setUpdateGroupNamePopupVisible, setUpdateAddUsersModalVisible, setRemoveUsersModalVisible, setDeleteGroupModalVisible }) => {


    const [menuIconsVisible, setMenuIconsVisible] = useState(false)
    const toggleMenu = () => {
        setMenuIconsVisible(prev => !prev)
    }

    return (

        <div className='chat-header-menu'>
            <CreateRoundedIcon
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
            />

            <MoreVertIcon
                className={menuIconsVisible ? "rot45deg x close-menu" : "rot0deg x"}    
            />
            <MoreVertIcon
                className={menuIconsVisible ? "rot-45deg close-menu" : "rot0deg"}    
                onClick={toggleMenu}
            />
        </div>

    )
}

export default ChatHeaderMenu;
