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
import { updateTotalMatches } from '../../../redux/features/search/searchRoomsSlice';


const ChatGroup = ({ roomId, active, search }) => {

    const dispatch = useDispatch()
    const roomsData = useSelector(state => state.rooms.roomsData)
    const roomIndex = roomsData ? roomsData.findIndex(room => room.roomId === roomId) : 0
    const roomName = roomsData[roomIndex] ? roomsData[roomIndex]?.roomName : "Loading..."

    const previousActiveRoomId = useSelector(state => state.rooms?.currentActiveRoomId)
    const activityLog = useSelector(state => state.activityLog?.lastActive)
    const userId = useSelector(state => state.user?.mongoDbUserId)

    const allRoomsData = useSelector(state => state.rooms.roomsData)
    const room = allRoomsData?.filter(room => room.roomId === roomId)

    const activeRoomId = useSelector(state => state.rooms.activeRoomId)

    const profilePictureUrl = room[0]?.profilePictureUrl

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
    }

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(chatLog => chatLog.roomId === roomId)[0])
    const messagePreview = () => {
        if (chatLog?.messagesArray) {
            const lastMessage = chatLog.messagesArray[chatLog.messagesArray?.length - 1]
            if (lastMessage) {
                return ( <p> {lastMessage.messageContent} </p> )
            } else {
                return ( <p className='begin-new-chat'>New group created &nbsp;&nbsp;<span>💬</span></p> )
            }
        }
        return ( <p className='begin-new-chat'>New group created &nbsp;&nbsp;<span>💬</span></p> )
    }

    const messagesArrayLength = chatLog?.messagesArray?.length
    const [inboxCount, setInboxCount] = useState(0)
    
    useEffect(() => {
        const lastActive = activityLog ? activityLog[roomId] : null
        if (chatLog?.messagesArray) {
            setInboxCount(searchInsertPosition(chatLog?.messagesArray || [], lastActive))
        }

        // eslint-disable-next-line
    }, [chatLog, active, roomId])

    const [timeSinceLastMessage, setTimeSinceLastMessage] = useState(null)
    useEffect(() => {
        const calculateTimeSinceLastMessage = () => {
            const timeSince = formatDate(chatLog?.messagesArray[messagesArrayLength-1]?.dateCreated, "difference") 
            setTimeSinceLastMessage(timeSince)
        }
        calculateTimeSinceLastMessage()

        const intervalId = setInterval(calculateTimeSinceLastMessage, 60_000)

        return ( () => {
            clearInterval(intervalId)
        })
    }, [activityLog, chatLog?.messagesArray, messagesArrayLength])

    const [isMatch, setIsMatch] = useState(false)
    useEffect(() => {
        const checkIsMatch = (searchTerm) => {
            if (!searchTerm) {
                setIsMatch(false)
                return
            }

            const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const match = roomName.toLowerCase().match(new RegExp(escapedSearchTerm.toLowerCase(), 'i'))

            if (match) {
                setIsMatch(true)
                dispatch(updateTotalMatches())
            } else {
                setIsMatch(false)
            }
        }
        checkIsMatch(search)

        // eslint-disable-next-line
    }, [search, dispatch])
   

    return (
        <div 
            className={`chat-group ${active ? "active-chat" : null}`} 
            onClick={updateActivityLogAndActivateRoom}
        >

               <Avatar
                    width={55}
                    responsive={false}
                    url={profilePictureUrl}
               />

                <div className='chat-group__message'>
                    <div className='message__sender'>
                        <p>
                            <span
                                className={`${isMatch ? "highlight" : null}`}
                            > 
                                { roomName } 
                            </span>
                        </p>
                    </div>
                    <div className={`message__preview ${inboxCount >= 1 ? "bold" : null}`}>
                        { messagePreview() }
                    </div>
        
                </div>

                <div className='chat-group__meta-data'>
                    <div className={`meta-data__time ${inboxCount >= 1 ? "bold" : null}`}>
                        <p>
                            {   chatLog?.messagesArray?.length === 0 ?
                                "New"
                                :
                                timeSinceLastMessage
                            }
                        </p>
                    </div>

                    
                    {   
                        (roomId !== activeRoomId) && (inboxCount !== 0) ?
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