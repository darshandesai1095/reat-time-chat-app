import './ChatGroup.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentActiveRoom } from '../../../redux/features/rooms/roomSlice';

const ChatGroup = ({ connected, roomName, roomId, setRoom, joinRoom, active }) => {

    const dispatch = useDispatch()
    const activateRoom = () => {
        dispatch(changeCurrentActiveRoom(roomId))
    }

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(chatLog => chatLog.roomId === roomId)[0])

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
                        <p>
                            {
                                chatLog?.messagesArray ?
                                chatLog.messagesArray[chatLog?.messagesArray?.length -1].messageContent
                                :
                                "Loading Content..."
                            }  
                        </p>
                    </div>
        
                </div>

                <div className='chat-group__meta-data'>
                    <div className='meta-data__time'>
                        <p>21:30</p>
                    </div>
                </div>
        
    
        </div>
    );
}

export default ChatGroup

            /* <input 
                type="text" 
                placeholder='room'
                onChange={(e) => setRoom(e.target.value)}
                value={username}
                disabled
            />

            <button 
                onClick={() => joinRoom({room})}>
                Username
            </button>
            

            <input 
                type="text" 
                placeholder='room'
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                disabled
            />

            <button 
                onClick={() => joinRoom({room})}>
                Join Room
            </button> */

            // Lorem ipsum dolor sit amet, 
            //                 consectetur adipiscing elit, 
            //                 sed do eiusmod tempor incididunt 
            //                 ut labore et dolore magna aliqua..