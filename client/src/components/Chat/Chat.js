import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import './Chat.css';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import padNumberWithZeros from '../../functions/padNumbersWithZeros'

const Chat = ({socket, room, username}) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage === "") return
    const messageData = {
      room: room,
      username: username,
      currentMessage: currentMessage,
      time:   padNumberWithZeros(new Date(Date.now()).getHours(), 2) +
              ":" +
              padNumberWithZeros(new Date(Date.now()).getMinutes(), 2)
    }



    await socket.emit("send", messageData)
    setMessageList(list => [...list, messageData])
    setCurrentMessage("")
  }

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

                <div className='chat__message-input'>
                    <MessageInput
                        setCurrentMessage={setCurrentMessage}
                        currentMessage={currentMessage}
                        sendMessage={sendMessage}
                    />
                </div>
     </ScrollToBottom>
    )
}

export default Chat;
