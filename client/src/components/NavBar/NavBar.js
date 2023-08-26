import './NavBar.css';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateNewGroupModal, toggleShowSettingsModal } from '../../redux/features/modals/modalSlice';
import { logout } from '../../redux/features/users/userSlice';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import UnreadMessageCount from '../AllChats/UnreadMessageCount/UnreadMessageCount';
import NotificationsMenu from './NotificationsMenu/NotificationsMenu';
import { useState } from 'react';


const NavBar = () => {

    const dispatch = useDispatch()
    const globalAlertsCount = useSelector(state => state.globalAlerts.totalAlerts)
    
    const style = {
        transform: "scale(1.1)"
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const [notificationsMenuVisible, setNotificationsMenuVisible] = useState(false)

    return (
        <div className="nav-bar">
            <div className='nav-bar__primary'>

                <div className='icons' onClick={() => dispatch(toggleCreateNewGroupModal())}>
                    <AddBoxRoundedIcon style={style}/>
                    {/* <p>New Group</p> */}
                </div>

                <div className='icons global-alerts'>
                    <NotificationsRoundedIcon 
                        style={style} 
                        onClick={() => setNotificationsMenuVisible(prev => !prev)}
                    />
                    <div className={`global-alerts__message-count ${globalAlertsCount !== 0 ? "show-alerts" : "hide-alerts"}`}>
                        <UnreadMessageCount count={globalAlertsCount} />
                    </div>
                </div>

                {/* <div className='icons'>
                    <GroupsRoundedIcon style={style}/>
                        <p>New Chat</p>
                </div> */}

                {/* <div className='icons'>
                    <ForumRoundedIcon style={style}/>
                        <p>Chats</p>
                </div> */}

                {/* <div className='linebreak'> </div> */}

                <div className='icons'>
                    <CropSquareRoundedIcon style={style}/>
                    {/* <p>Sandbox</p> */}
                </div>
                
                <div className='icons'>
                    <InfoRoundedIcon style={style}/>
                    {/* <p>About</p> */}
                </div>

            </div>

            <div className='nav-bar__secondary'>

                <div className='icons' onClick={() => dispatch(toggleShowSettingsModal())}>
                    <SettingsRoundedIcon style={style}/>
                    {/* <p>Settings</p> */}
                </div>
                <div className='icons'
                    onClick={handleLogout}
                >
                    <LogoutRoundedIcon style={style}/>
                    {/* <p>Logout</p> */}
                </div>    

            </div>

            {
                notificationsMenuVisible ?
                <div className='nav-bar__notifications-menu'>
                    <NotificationsMenu
                        setNotificationsMenuVisible={setNotificationsMenuVisible}
                    />
                </div>
                :
                null
          
            }
    

        </div>
    )
}

export default NavBar;