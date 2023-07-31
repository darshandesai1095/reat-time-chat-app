import './AllChatsBody.css';
import ChatGroup from "../ChatGroup/ChatGroup"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const AllChatsBody = ({connected, username, room, setRoom, joinRoom}) => {
  

  const isLoading = useSelector(state => state.rooms.loading)
  const roomsData = useSelector(state => state.rooms.roomsData)
  const chatRooms = roomsData?.map(room => {
    return (
        <ChatGroup
        key={room.roomId}
        connected={connected}
        roomName={room.roomName}
        room={room.roomId}
        setRoom={setRoom}
        joinRoom={joinRoom}
      />
    )
  })


  return (

    <div className="all-chats-body">

      { isLoading ? <p style={{color:"black"}}>Loading...</p> : chatRooms }

    </div>
  )
}

export default AllChatsBody;
