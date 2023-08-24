import { useSelector, useDispatch } from 'react-redux';
import './MessageBubble.css';
import formatDate from '../../../functions/misc/formatDate';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Avatar from '../../Avatar/Avatar';
import { useEffect } from 'react';
import { updateActivityLog } from '../../../redux/features/activityLogs/activityLogSlice';
import { setLastActiveInLocalStorage } from '../../../functions/misc/localStorage';


const MessageBubble = ({ prevMessageSender, sameAsPrevMessageDate, messageObj, roomId }) => {

    const { username, messageContent, dateCreated, deliveryStatus } = messageObj
    const clientUsername = useSelector(state => state.user.username)

    const dispatch = useDispatch()
    const activityLog = useSelector(state => state.activityLog?.lastActive)
    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)
    const userId = useSelector(state => state.user.mongoDbUserId)

    // const roomData = useSelector(state => state.rooms?.roomsData?.filter(room => room.roomId === roomId))
    // const roomByIdSelector = selectRoomById(roomId)

    // const filteredRoomData = useSelector(state => selectRoomById(state)(roomId)) // get room object
    // OR
    const allRoomsData = useSelector(state => state.rooms.roomsData)
    const filteredRoomData = allRoomsData.filter(room => room.roomId == roomId)


    const roomUsersArr = filteredRoomData[0]?.roomUsers
    const senderProfile = roomUsersArr?.filter(roomMember => roomMember.userId === messageObj.senderId)
    const senderProfilePictureUrl = senderProfile[0]?.profilePictureUrl


    // const profilePictureUrl = filteredRoomData?.profilePictureUrl


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
            return (  <ErrorOutlineRoundedIcon className='send-status error'/> )
        }
        if (deliveryStatus === 'sending') {
            return (  <CheckCircleOutlineRoundedIcon className='send-status sending'/> )
        }
        return ( <CheckCircleOutlineRoundedIcon className='send-status sent'/> )
    }

    return (
        <>
  
        <div className={`${ sameAsPrevMessageDate ? "hide-date" : "show-date"}`} >
            { 
                formatDate(dateCreated, "checkIsToday") ? 
                <p>Today</p> 
                :
                <p>   { formatDate(dateCreated, "checkIsYesterday") ? "Yesterday" : formatDate(dateCreated, "date") } </p>
            }

        </div>


        <div className={`message-bubble ${ messageObj.senderId === userId ? "align-right" : null}`}>

            <div className={`message-bubble__avatar ${prevMessageSender === username && sameAsPrevMessageDate ? "invisible" : "visible"}`}>
                <Avatar 
                    width={prevMessageSender === username ? 45 : 45} 
                    height={prevMessageSender === username ? 0 : 45}
                    borderRadiusPixels={25}
                    url={senderProfilePictureUrl}
                />
            </div>


            <div className='message_bubble__content'>

                <div className={`message_bubble__info ${prevMessageSender === username && sameAsPrevMessageDate ? "hidden" : "visible"}`}>
                    <p className={ `info__username`}>
                        { messageObj.senderId === userId ? clientUsername : username || "unidentified user" }
                    </p>
                    <p className={ `info__time` }>
                        { formatDate(dateCreated, "time") }
                    </p>
                </div>

                <div className='main'>

                    <div className={`${prevMessageSender === username ? "info__show" : "info__hide"}`}>
                        <p>
                            { formatDate(dateCreated, "time") }
                        </p>
                    </div>

                    <div className="message-bubble__main">
                        <p className='main__message'>{messageContent}</p>
                    </div>

                </div>
            </div>

            <div className='message-bubble__meta-data'>
                {deliveryStatusIcon()}
            </div>

        </div>

        </>
    )
}

export default MessageBubble;