import { useSelector, useDispatch } from 'react-redux';
import './MessageBubble.css';
import formatDate from '../../../functions/misc/formatDate';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Avatar from '../../Avatar/Avatar';
import { useEffect } from 'react';
import { updateActivityLog } from '../../../redux/features/activityLogs/activityLogSlice';
import { setLastActiveInLocalStorage } from '../../../functions/misc/localStorage';

const MessageBubble = ({ prevMessageSender, messageObj, roomId }) => {

    const { username, senderId, messageContent, dateCreated, messageId, deliveryStatus } = messageObj
    const clientUsername = useSelector(state => state.user.username)
    const clientsenderId = useSelector(state => state.user.senderId)

    const dispatch = useDispatch()
    const activityLog = useSelector(state => state.activityLog.lastActive)
    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)
    const userId = useSelector(state => state.user.mongoDbUserId)

    useEffect(() => {
        const date = Date.now()
        dispatch(updateActivityLog({
            ...activityLog, 
            roomId: roomId, 
            timestamp: date
        }))
        setLastActiveInLocalStorage(userId, {
            ...activityLog,
            [roomId]:  date
        })
        
    }, [currentActiveRoomId])

    const deliveryStatusIcon = () => {
        if (deliveryStatus === ' failed to send') {
            return (  <ErrorOutlineRoundedIcon className='send-status' style={{fill: "#ff4d6d"}}/> )
        }
        if (deliveryStatus === 'sending') {
            return (  <CheckCircleOutlineRoundedIcon className='send-status' style={{fill: "rgb(128, 130, 150)"}}/> )
        }
        return ( <CheckCircleOutlineRoundedIcon className='send-status' style={{fill: "rgb(107,138,253)"}}/> )
    }

    return (
        <div className={`message-bubble ${ username === clientUsername ? "align-right" : null}`}>

            <div className={`message-bubble__avatar ${prevMessageSender === username ? "invisible" : "visible"}`}>
                <Avatar 
                    width={prevMessageSender === username ? 40 : 40} 
                    height={prevMessageSender === username ? 0 : 40}
                    borderRadiusPixels={25}
                />
            </div>

            <div className='message_bubble__content'>
                <div className={`message_bubble__info ${prevMessageSender === username ? "hidden" : "visible"}`}>
                    <p className={ `info__username`}>
                        {username || "unidentified user"}
                    </p>
                    <p className={ `info__time` }>
                        {formatDate(dateCreated, true)}
                    </p>
                </div>
                <div className="message-bubble__main">
                    <p className='main__message'>{messageContent}</p>
    
                </div>
            </div>

            <div className='message-bubble__meta-data'>
                {deliveryStatusIcon()}
            </div>

        </div>
    )
}

export default MessageBubble;
