import './CurrentChat.css';
import { useState } from 'react';
import MessagesWindow from './Chat/MessagesWindow';
import MessageInput from './MessageInput/MessageInput';
import ChatHeader from './ChatHeader/ChatHeader';
import { useSelector, useDispatch } from 'react-redux';
import StartNewChat from './StartNewChat/StartNewChat';
import { socketIoSendMessageToServer, pushMessageToChatLog } from '../../redux/features/chatLogs/chatLogSlice';
import uuid from 'react-uuid';


const CurrentChat = () => {

    const dispatch = useDispatch()

    const roomsData = useSelector(state => state.rooms.roomsData)
    const totalGroups = roomsData?.length
    const roomId = useSelector(state => state.rooms.currentActiveRoomId)

    
    const {username, mongoDbUserId } = useSelector(state => state.user)

    const [currentMessage, setCurrentMessage] = useState("")

    const sendMessage = async () => {
        if (currentMessage.trim() === "") { return }

        const messageData = {
            roomId: roomId,
            message: {
              messageId: uuid(),
              senderId: mongoDbUserId,
              username: username,
              messageContent: currentMessage,
              dateCreated: Date.now(),
              deliveryStatus: "sending" // ["sending", "sent", "failed to send"]
            }
        }

        dispatch(pushMessageToChatLog(messageData))
        setCurrentMessage("")
        try {
          await Promise.resolve(dispatch(socketIoSendMessageToServer(messageData)))
        } catch (error) {
          console.log("error sending message to server", error) // add error icon to status
        }
    
      }

  return (
    <>
        {
          !totalGroups ?

          <StartNewChat/>
          :
          <div className="current-chat">

            <ChatHeader/>

            <MessagesWindow
                roomId={roomId}
            />
            <MessageInput
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                sendMessage={sendMessage}
            />
          </div>

        }
    </>

  )
}

export default CurrentChat;