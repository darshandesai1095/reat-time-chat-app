import MessageBubble from '../MessageBubble/MessageBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import formatDate from '../../../functions/misc/formatDate';
import './MessagesWindow.css';
import { useEffect } from 'react';

const MessagesWindow = ({ roomId }) => {
    // const allRoomsData = useSelector(state => state.rooms.roomsData)

    // const allRoomsUserData = allRoomsData?.filter(room => room.roomId === roomId)
    // console.log("allRoomsData", allRoomsData)
    // const activeRoomUserData = allRoomsUserData ? allRoomsUserData[0].roomUsers : []
    // const usersObj = {}
    // activeRoomUserData?.forEach(user => {
    //     usersObj[user.userId] = user
    // })
    

    const chatLog = useSelector(state => state.chatLogs?.chatLogData?.filter(room => room.roomId == roomId)[0])
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
                                // senderData={usersObj[messageObj.senderId]}
                            />
                        )
                    }) : []
                }
            </div>
     </ScrollToBottom>
    )
}

export default MessagesWindow;