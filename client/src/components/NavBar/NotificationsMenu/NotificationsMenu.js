import { useSelector } from 'react-redux';
import NotificationItem from '../NotificationItem/NotificationItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './NotificationsMenu.css';


const NotificationsMenu = ({ setNotificationsMenuVisible }) => {

    const alertLog = useSelector(state => state.globalAlerts.alertLog)
    const notifications = alertLog.map( (item, i) => {
        return (
            <NotificationItem
                key={i}
                alert={item}
            />
        )
    })

    return (
        <div className="notifications-menu">
            <div className='notifications-menu__header'>
                <h4>Notifications</h4>
                <CloseRoundedIcon
                    onClick={() => setNotificationsMenuVisible(false)}
                />
            </div>
            {   alertLog?.length > 0 ?
                notifications
                :
                <div className="notification-item">
                    <div className='notification-item__header'>
                        <p> { "New notifications will appear here" } </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default NotificationsMenu;