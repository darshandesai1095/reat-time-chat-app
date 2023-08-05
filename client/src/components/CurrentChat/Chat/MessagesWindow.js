import MessageBubble from '../MessageBubble/MessageBubble';
import { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './MessagesWindow.css';

const MessagesWindow = ({socket, room, username, messageList, setMessageList}) => {

    useEffect(() => {
        socket.on("receive", (data) => {
          setMessageList(list => [...list, data])
        })

    }, [socket])

    return (
        <ScrollToBottom className="chat">
            <div className='chat__messages'>
                {    
                    messageList.map((messageObj, index) => {
                    return (
                        <MessageBubble
                            key={index}
                            prevMessageSender={messageList[index-1]?.username || null}
                            user={username}
                            messageData={messageObj}
                        />
                        )
                    })
                }
            </div>
     </ScrollToBottom>
    )
}

export default MessagesWindow;
