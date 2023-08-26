import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useDispatch, useSelector } from 'react-redux';
import { socketIoListenForGlobalAlert } from '../../../redux/socket/socketIO';
import { useEffect, useState } from 'react';
import convertToUnixTimestamp from '../../../functions/misc/convertToUnixTimestamp';


const AllChatsBody = ({ search }) => {

    const userId = useSelector(state => state.user.mongoDbUserId)
    const userRooms = useSelector(state => state.user.rooms)
    const roomsActivityLog = useSelector(state => state.activityLog?.lastActive)
    const chatLogsData = useSelector(state => state.chatLogs.chatLogData)
    const dispatch = useDispatch()

    const [activityLog, setActivityLog] = useState(null)

    useEffect(() => {
        socketIoListenForGlobalAlert(dispatch, userId, userRooms, roomsActivityLog)
    }, [userRooms])

    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)

    // sort roomsData by last active
    // >  get last active from local storage?
    // const roomsDataSortedByLastActive = roomsData.sort()
    const date = Date.now()
    let shallowCopyChatLogsData = chatLogsData ? [...chatLogsData] : []
    shallowCopyChatLogsData?.sort((room1, room2) => {
        const room1MessagesArray = room1.messagesArray
        const room1TotalMessages = room1MessagesArray.length
        const lastMessageTime1 = room1TotalMessages > 0 ? room1MessagesArray[room1TotalMessages-1].dateCreated : date-1
        const lastMessageTime1Unix = convertToUnixTimestamp(lastMessageTime1)

        const room2MessagesArray = room2.messagesArray
        const room2TotalMessages = room2MessagesArray.length
        const lastMessageTime2 = room2TotalMessages > 0 ? room2MessagesArray[room2TotalMessages-1].dateCreated : date-1
        const lastMessageTime2Unix = convertToUnixTimestamp(lastMessageTime2)

        return (lastMessageTime1Unix - lastMessageTime2Unix)
    })


    const chatRooms = shallowCopyChatLogsData?.map(room => {
      const roomId = room.roomId
      return (
          <ChatGroup
            key={roomId}
            roomName={room.roomName}
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