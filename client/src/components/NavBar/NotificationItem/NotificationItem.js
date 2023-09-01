import formatDate from '../../../functions/misc/formatDate';
import './NotificationItem.css';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const NotificationItem = ({ alert }) => { // alt format { alertTitle, alertTime, alertMessage }

    return (
        <div className="notification-item">
            <div className='notification-item__header'>
                <div className='notification-item__header-title'> 
                    <h4>
                        {alert.alertTitle} 
                    </h4>
                    { alert.isError ? <ErrorOutlineRoundedIcon/> : null}
                </div>
                <p> {formatDate(alert.alertTime, "difference")} </p>
            </div>
            <div className='notification-item__body'>
                <p>
                    { alert.alertTitle === "Group Deleted" ? `${alert.alertInfo.deletedBy} deleted ${alert.alertInfo.roomName}` : null }
                    { alert.alertTitle === "Group Name Updated" ? `${alert.alertInfo.originalRoomName} was changed to ${alert.alertInfo.roomName} by ${alert.alertInfo.updatedByUsername}` : null }
                    { alert.alertTitle === "User Added To Group" ? `${alert.alertInfo.updatedByUsername} added you to ${alert.alertInfo.roomName}` : null }
                    { alert.alertTitle === "User Removed From Group" ? `${alert.alertInfo.updatedByUsername} removed you from ${alert.alertInfo.roomName}` : null }
                    { alert.alertTitle === "New Group Created" ? `${alert.alertInfo.createdByUsername} created ${alert.alertInfo.roomName}` : null }
                    
                    { alert.alertTitle === "Error Deleting Group" ? `An error occured whilst trying to delete ${alert.roomName}` : null }
                    
                    { alert.alertTitle === "Error Deleting Account" ? `${alert.alertMessage}` : null }

                </p>
            </div>
        </div>
    )
}

export default NotificationItem;

// remove user error -> current active room not being updated