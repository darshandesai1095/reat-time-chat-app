import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useDispatch, useSelector } from 'react-redux';
import { socketIoListenForGlobalAlert } from '../../../redux/socket/socketIO';
import { useEffect, useState } from 'react';


const AllChatsBody = () => {

    const userId = useSelector(state => state.user.mongoDbUserId)
    const userRooms = useSelector(state => state.user.rooms)
    const dispatch = useDispatch()

    const [activityLog, setActivityLog] = useState(null)

    useEffect(() => {
        socketIoListenForGlobalAlert(dispatch, userId, userRooms)
    }, [userId, userRooms])

    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)

    const roomsData = useSelector(state => state.rooms.roomsData)
    const chatRooms = roomsData?.map(room => {
      const roomId = room.roomId
      return (
          <ChatGroup
            key={roomId}
            roomName={room.roomName}
            roomId={roomId}
            active={ currentActiveRoomId === room.roomId ? true : false }
            activityLog={ activityLog ? activityLog : {} }
            setActivityLog = {setActivityLog}
          />
      )
    })


    return (

      <div className="all-chats-body">
        {chatRooms?.reverse()}
      </div>
    )
}

export default AllChatsBody;
