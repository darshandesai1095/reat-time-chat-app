import MessageBubble from '../MessageBubble/MessageBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import './MessagesWindow.css';

const MessagesWindow = ({ roomId }) => {

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(room => room.roomId == roomId)[0])
    const messagesArray = chatLog?.messagesArray

    return (
        <ScrollToBottom className="chat">
            <div className='chat__messages'>
                {    
                    messagesArray?.map((messageObj, index) => {
                    return (
                        <MessageBubble
                            key={index}
                            prevMessageSender={messagesArray[index-1]?.username || null}
                            messageObj={messageObj}
                        />
                        )
                    })
                }
            </div>
     </ScrollToBottom>
    )
}

export default MessagesWindow;
