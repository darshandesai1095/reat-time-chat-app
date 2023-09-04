import './NavBar.css';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateNewGroupModal, toggleShowSettingsModal } from '../../redux/features/modals/modalSlice';
import { logout } from '../../redux/features/users/userSlice';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import UnreadMessageCount from '../AllChats/UnreadMessageCount/UnreadMessageCount';
import NotificationsMenu from './NotificationsMenu/NotificationsMenu';
import { useEffect, useState } from 'react';
import { getNotifications } from '../../redux/features/globalAlerts/globalAlertSlice';


const NavBar = () => {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.mongoDbUserId)
    useEffect(() => {
        dispatch(getNotifications(userId))
    }, [userId, dispatch])

    
    const style = {
        transform: "scale(1.1)"
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const [notificationsMenuVisible, setNotificationsMenuVisible] = useState(false)

    const alertLog = useSelector(state => state.globalAlerts.alertLog)
    const userErrorLog = useSelector(state => state.user.userErrorLog)
    const totalNotifications = alertLog?.length + userErrorLog?.length

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
                    <div className={`global-alerts__message-count ${totalNotifications !== 0 ? "show-alerts" : "hide-alerts"}`}>
                        <UnreadMessageCount count={totalNotifications} />
                    </div>
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