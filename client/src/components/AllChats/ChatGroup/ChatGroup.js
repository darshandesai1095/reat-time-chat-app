import './ChatGroup.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentActiveRoom } from '../../../redux/features/rooms/roomSlice';
import Avatar from '../../Avatar/Avatar';
import UnreadMessageCount from '../UnreadMessageCount/UnreadMessageCount';
import { useEffect, useState } from 'react';
import { updateActivityLog } from '../../../redux/features/activityLogs/activityLogSlice';
import formatDate from '../../../functions/misc/formatDate';
import { setLastActiveInLocalStorage } from '../../../functions/misc/localStorage';
import searchInsertPosition from '../../../functions/misc/searchInsertPosition';

const ChatGroup = ({ roomName, roomId, active }) => {

    const dispatch = useDispatch()
    const previousActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)
    const activityLog = useSelector(state => state.activityLog.lastActive)
    const userId = useSelector(state => state.user.mongoDbUserId)


    const updateActivityLogAndActivateRoom = () => {
        // if previous active room !== new active room -> updateActivityLog
        const date = Date.now()
        if (previousActiveRoomId !== roomId) {
            dispatch(updateActivityLog({
                ...activityLog, 
                roomId: roomId, 
                timestamp: date
            }))
        }
        setLastActiveInLocalStorage(userId, {
            ...activityLog,
            [roomId]:  date
        })
        // update current activate room
        dispatch(changeCurrentActiveRoom(roomId))
        console.log("activity log", activityLog)
    }

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(chatLog => chatLog.roomId === roomId)[0])
    const messagePreview = () => {
        if (chatLog?.messagesArray) {
            const lastMessage = chatLog.messagesArray[chatLog.messagesArray?.length - 1]
            if (lastMessage) {
                return ( <p> {lastMessage.messageContent} </p> )
            } else {
                return ( <p className='begin-new-chat'>New group created. Click here to begin chat &nbsp;<span>💬</span></p> )
            }
        }
        return ( <p className='begin-new-chat'>New group created. Click here to begin chat &nbsp;<span>💬</span></p> )
    }

    const messagesArrayLength = chatLog?.messagesArray?.length
    const [inboxCount, setInboxCount] = useState(0)
    
    useEffect(() => {
        const lastActive = activityLog[roomId]

        setInboxCount(searchInsertPosition(chatLog?.messagesArray, lastActive))

    }, [chatLog, active, activityLog])



    return (
        <div 
            className={`chat-group ${active ? "active-chat" : null}`} 
            onClick={updateActivityLogAndActivateRoom}
        >

               <Avatar
                    borderRadiusPixels={55}
               />

                <div className='chat-group__message'>
                    <div className='message__sender'>
                        <p>
                            {roomName}
                        </p>
                    </div>
                    <div className={`message__preview ${inboxCount >= 1 ? "bold" : null}`}>
                        { messagePreview() }
                    </div>
        
                </div>

                <div className='chat-group__meta-data'>
                    <div className='meta-data__time'>
                        <p>
                            { formatDate(chatLog?.messagesArray[messagesArrayLength-1]?.dateCreated, true) }
                        </p>
                    </div>
                    {   
                        inboxCount !== 0 ?
                        (
                            <UnreadMessageCount
                                count={inboxCount}
                            />
                        ) : (
                            null
                        )
                    }

                </div>
        
    
        </div>
    )
}

export default ChatGroup