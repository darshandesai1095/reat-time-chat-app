import './CurrentChat.css';
import { useState, useEffect } from 'react';
import padNumberWithZeros from '../../functions/misc/padNumbersWithZeros';
import MessagesWindow from './Chat/MessagesWindow';
import MessageInput from './MessageInput/MessageInput';
import ChatHeader from './ChatHeader/ChatHeader';
import { useSelector, useDispatch } from 'react-redux';
import StartNewChat from './StartNewChat/StartNewChat';
import { sendMessageToServer } from '../../redux/features/chatLogs/chatLogSlice';


const CurrentChat = ({socket, connected, username, room, setRoom, joinRoom}) => {

    const dispatch = useDispatch()

    const totalGroups = useSelector(state => state.rooms.roomsData?.length)

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage.trim() === "") { return }

         // messageData = { roomId, senderId, username, messageContent }
        const messageData = {
            roomId: "100",
            senderId: "1",
            username: "darshan",
            messageContent: currentMessage
        }
        await Promise.resolve(dispatch(sendMessageToServer(messageData)))
        // const messageData = {
        //   room: room,
        //   username: username,
        //   currentMessage: currentMessage,
        //   time:   padNumberWithZeros(new Date(Date.now()).getHours(), 2) +
        //           ":" +
        //           padNumberWithZeros(new Date(Date.now()).getMinutes(), 2)
        // }
    
        // await socket.emit("response", messageData)
        // setMessageList(list => [...list, messageData])
        // setCurrentMessage("")
      }


  return (
    <>
        {
          totalGroups == 0 ?

          <StartNewChat/>
          :
          <div className="current-chat">

            <ChatHeader/>

            <MessagesWindow
                socket={socket}
                room={room}
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
