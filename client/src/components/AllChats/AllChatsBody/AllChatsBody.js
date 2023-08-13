import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useDispatch, useSelector } from 'react-redux';
import { socketIoListenForGlobalAlert } from '../../../redux/socket/socketIO';
import { useEffect } from 'react';


const AllChatsBody = ({connected, setRoom, joinRoom}) => {

    const userId = useSelector(state => state.user.mongoDbUserId)
    const userRooms = useSelector(state => state.user.rooms)
    const dispatch = useDispatch()

    useEffect(() => {
        socketIoListenForGlobalAlert(dispatch, userId, userRooms)
    }, [userId, userRooms])

    const currentActiveRoomId = useSelector(state => state.rooms.currentActiveRoomId)

    const roomsData = useSelector(state => state.rooms.roomsData)
    const chatRooms = roomsData?.map(room => {
      return (
          <ChatGroup
            key={room.roomId}
            connected={connected}
            roomName={room.roomName}
            roomId={room.roomId}
            setRoom={setRoom}
            joinRoom={joinRoom}
            active={currentActiveRoomId === room.roomId ? true : false}
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
