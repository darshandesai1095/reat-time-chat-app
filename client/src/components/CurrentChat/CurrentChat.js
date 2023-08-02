import './CurrentChat.css';
import { useState, useEffect } from 'react';
import padNumberWithZeros from '../../functions/misc/padNumbersWithZeros';
import MessagesWindow from './Chat/MessagesWindow';
import MessageInput from './MessageInput/MessageInput';
import ChatHeader from './ChatHeader/ChatHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getChatLogsByRoomsArray } from '../../redux/features/chatLogs/chatLogSlice';


const CurrentChat = ({socket, connected, username, room, setRoom, joinRoom}) => {

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

      const activeRoomId = useSelector(state => state.rooms.currentActiveRoomId)
      const dispatch = useDispatch()

      const getChatLog = async () => {
        try {
          await Promise.resolve(
            dispatch(
              getChatLogsByRoomsArray([activeRoomId])
            )
          )
        } catch (error) {
            console.log("get chat log: ", error)
        }
      }
      getChatLog()


  return (
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
  )
}

export default CurrentChat;
