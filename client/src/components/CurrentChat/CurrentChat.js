import './CurrentChat.css';
import { useState, useEffect } from 'react';
import padNumberWithZeros from '../../functions/misc/padNumbersWithZeros';
import MessagesWindow from './Chat/MessagesWindow';
import MessageInput from './MessageInput/MessageInput';
import ChatHeader from './ChatHeader/ChatHeader';
import { useSelector, useDispatch } from 'react-redux';
import StartNewChat from './StartNewChat/StartNewChat';
import { socketIoSendMessageToServer, pushMessageToChatLog } from '../../redux/features/chatLogs/chatLogSlice';
import { format } from 'date-fns';


const CurrentChat = () => {

    const dispatch = useDispatch()

    const totalGroups = useSelector(state => state.rooms.roomsData?.length)
    const roomId = useSelector(state => state.rooms.currentActiveRoomId)
    const chatLogData = useSelector(state => state.chatLogs.chatLogData)
    const {username, mongoDbUserId } = useSelector(state => state.user)

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage.trim() === "") { return }

        const messageData = {
            roomId: roomId,
            senderId: mongoDbUserId,
            username: username,
            messageContent: currentMessage,
            dateCreated: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            status: "sending" // ["sending", "sent", "failed to send"]
        }

        dispatch(pushMessageToChatLog(messageData))
        setCurrentMessage("")
        await Promise.resolve(dispatch(socketIoSendMessageToServer(messageData)))
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
                username={username}
                messageList={messageList}
                setMessageList={setMessageList}
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