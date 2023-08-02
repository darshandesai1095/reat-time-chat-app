import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useSelector } from 'react-redux';


const AllChatsBody = ({connected, username, room, setRoom, joinRoom}) => {

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
