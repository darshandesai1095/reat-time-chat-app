import MessageBubble from '../MessageBubble/MessageBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import formatDate from '../../../functions/misc/formatDate';
import './MessagesWindow.css';

const MessagesWindow = ({ roomId }) => {


    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(room => room.roomId === roomId)[0])
    const messagesArray = chatLog?.messagesArray

    return (
        <ScrollToBottom className="chat">
            <div className='chat__messages'>
                {   messagesArray ?
                    messagesArray?.map((messageObj, index) => { // messagesArray = [{ messageId, senderId, username, messageContent, dateCreated},{},{}]
                        return (
                            <MessageBubble
                                key={index}
                                prevMessageSender={messagesArray[index-1]?.username || null}
                                sameAsPrevMessageDate={ 
                                    formatDate( messagesArray[index-1]?.dateCreated, "date" ) === formatDate( messagesArray[index]?.dateCreated, "date" ) ? true : false 
                                }
                                messageObj={messageObj} // -> get senderId from here
                                roomId={roomId}
                            />
                        )
                    }) : []
                }
            </div>
     </ScrollToBottom>
    )
}

export default MessagesWindow;