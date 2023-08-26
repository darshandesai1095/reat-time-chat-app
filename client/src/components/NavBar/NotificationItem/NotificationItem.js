import formatDate from '../../../functions/misc/formatDate';
import './NotificationItem.css';


const NotificationItem = ({ alert }) => {

    return (
        <div className="notification-item">
            <div className='notification-item__header'>
                <h4> {alert.alertTitle} </h4>
                <p> {formatDate(alert.alertTime, "difference")} </p>
            </div>
            <div className='notification-item__body'>
                <p>
                    { alert.alertTitle === "Group Deleted" ? `${alert.alertInfo.roomName} was deleted by ${alert.alertInfo.deletedBy}` : null }
                    { alert.alertTitle === "Group Name Updated" ? `${alert.alertInfo.originalRoomName} was changed to ${alert.alertInfo.roomName} by ${alert.alertInfo.updatedByUsername}` : null }
                    { alert.alertTitle === "User Added To Group" ? `${alert.alertInfo.updatedByUsername} added you to ${alert.alertInfo.roomName}` : null }
                    { alert.alertTitle === "User Removed From Group" ? `${alert.alertInfo.updatedByUsername} removed you from ${alert.alertInfo.roomName}` : null }
                    { alert.alertTitle === "New Group Created" ? `${alert.alertInfo.createdByUsername} created ${alert.alertInfo.roomName}` : null }
                </p>
            </div>
        </div>
    )
}

export default NotificationItem;

// remove user error -> current active room not being updated