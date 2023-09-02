import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import convertToUnixTimestamp from '../../../functions/misc/convertToUnixTimestamp';


const AllChatsBody = ({ search }) => {

    const chatLogsData = useSelector(state => state.chatLogs.chatLogData)
    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)

    const [activityLog, setActivityLog] = useState(null)

    // sort roomsData by last active
    // >  get last active from local storage?
    // const roomsDataSortedByLastActive = roomsData.sort()
    let shallowCopyChatLogsData = chatLogsData ? [...chatLogsData] : []
    shallowCopyChatLogsData?.sort((room1, room2) => {
        const room1MessagesArray = room1.messagesArray
        const room1TotalMessages = room1MessagesArray.length
        const lastMessageTime1 = room1TotalMessages > 0 ? room1MessagesArray[room1TotalMessages-1].dateCreated : room1.dateCreated
        const lastMessageTime1Unix = convertToUnixTimestamp(lastMessageTime1)

        const room2MessagesArray = room2.messagesArray
        const room2TotalMessages = room2MessagesArray.length
        const lastMessageTime2 = room2TotalMessages > 0 ? room2MessagesArray[room2TotalMessages-1].dateCreated : room2.dateCreated
        const lastMessageTime2Unix = convertToUnixTimestamp(lastMessageTime2)

        return (lastMessageTime1Unix - lastMessageTime2Unix)
    })


    const chatRooms = shallowCopyChatLogsData?.map(room => {
      const roomId = room.roomId
      return (
          <ChatGroup
            key={roomId}
            roomId={roomId}
            active={ currentActiveRoomId === room.roomId ? true : false }
            activityLog={ activityLog ? activityLog : {} }
            setActivityLog = {setActivityLog}
            search={search}
          />
      )
    })

    return (

      <div className="all-chats-body">
        { chatRooms?.reverse() }
      </div>
    )
}

export default AllChatsBody