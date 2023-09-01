import { useDispatch, useSelector } from 'react-redux';
import NotificationItem from '../NotificationItem/NotificationItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './NotificationsMenu.css';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from 'react';
import { clearNotifications } from '../../../redux/features/globalAlerts/globalAlertSlice';
import { clearUserErrorLog } from '../../../redux/features/users/userSlice';


const NotificationsMenu = ({ setNotificationsMenuVisible }) => {

    const alertLog = useSelector(state => state.globalAlerts.alertLog)
    const userErrorLog = useSelector(state => state.user.userErrorLog)
    console.log("userErrorLog", userErrorLog)

    const notifications = [...alertLog, ...userErrorLog].map( (item, i) => {
        return (
            <NotificationItem
                key={i}
                alert={item}
            />
        )
    })

    const [expandMenu, setExpandMenu] = useState(false)
    const userId = useSelector(state => state.user.mongoDbUserId)
    const dispatch = useDispatch()
    const handleClearNotifications = async () => {
        try {
            dispatch(clearUserErrorLog())
            await Promise.resolve(dispatch(clearNotifications({userId})))
        } catch (error) {
            console.log("clear notifications error", error)
        }

    }

    const notificationsStatus = useSelector(state => state.globalAlerts.status)

    return (
        <div className="notifications-menu">
            <div className='notifications-menu__header'>
                <h4>Notifications</h4>
                <CloseRoundedIcon
                    onClick={() => setNotificationsMenuVisible(false)}
                />
            </div>
            <div className={`notifications-menu__body ${expandMenu ? "expand" : "contract"}`}>
                {   [...alertLog, ...userErrorLog]?.length > 0 ?
                    notifications?.reverse()
                    :
                    <div className="notification-item">
                        <div className='notification-item__header'>
                            <p> { "New notifications will appear here" } </p>
                        </div>
                    </div>
                }
            </div>

            {
                [...alertLog, ...userErrorLog]?.length > 0 ?

                <div className='alerts__expand'>
                    <ExpandMoreRoundedIcon
                        onClick={() => setExpandMenu(prev => !prev)}
                        style={{
                            transform: `${expandMenu ? "rotate(180deg)" : "rotate(0deg)"}`,
                            transition: "0.1s"
                        }}
                    />
                    {
                        notificationsStatus === "Clearing Notifications" ?
                        <p className='clearing-notifications'>
                            Clearing Notifications...
                        </p>
                        :
                        <p onClick={handleClearNotifications} className='clear-notifications'>
                            Clear All
                        </p>
                    }
        
                </div>

                :

                null
            }
           
        </div>
    )
}

export default NotificationsMenu;