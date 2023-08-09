import './ChatGroup.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentActiveRoom } from '../../../redux/features/rooms/roomSlice';

const ChatGroup = ({ connected, roomName, roomId, setRoom, joinRoom, active }) => {

    const dispatch = useDispatch()
    const activateRoom = () => {
        dispatch(changeCurrentActiveRoom(roomId))
    }

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(chatLog => chatLog.roomId === roomId)[0])
    const messagePreview = () => {
        if (chatLog?.messagesArray) {
            const lastMessage = chatLog.messagesArray[chatLog.messagesArray?.length - 1]
            if (lastMessage) {
                return ( <p> {lastMessage.username} <br/> {lastMessage.messageContent} </p> )
            } else {
                return ( <p className='begin-new-chat'>New group created. Click here to begin chat &nbsp;<span>💬</span></p> )
            }
        } else {
            return ( <p className='begin-new-chat'>New group created. Click here to begin chat &nbsp;<span>💬</span></p> )
        }
    }
    
    return (
        <div 
            className={`chat-group ${active ? "active-chat" : null}`} 
            onClick={activateRoom}
        >

                <img src="man.png" className='chat-group__avatar'/>

                <div className='chat-group__message'>
                    <div className='message__sender'>
                        <p>{roomName}</p>
                    </div>
                    <div className='message__preview'>
                        {messagePreview()}
                    </div>
        
                </div>

                <div className='chat-group__meta-data'>
                    <div className='meta-data__time'>
                        <p>21:30</p>
                    </div>
                </div>
        
    
        </div>
    )
}

export default ChatGroup