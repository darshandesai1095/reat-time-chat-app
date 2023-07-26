import MessageBubble from '../MessageBubble/MessageBubble';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import padNumberWithZeros from '../../../functions/padNumbersWithZeros'
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
                            prevMessageUser={messageList[index-1]?.username || null}
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
