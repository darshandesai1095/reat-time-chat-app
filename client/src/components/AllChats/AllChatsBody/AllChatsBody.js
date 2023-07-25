import './AllChatsBody.css';
import Group from "../ChatGroup/ChatGroup"

const AllChatsBody = ({connected, username, room, setRoom, joinRoom}) => {

  return (

    <div className="all-chats-body">

        <Group
          connected={connected}
          username={username}
          room={1}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
        <Group
          connected={connected}
          username={username}
          room={2}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
        <Group
          connected={connected}
          username={username}
          room={3}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
        <Group
          connected={connected}
          username={username}
          room={4}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
        <Group
          connected={connected}
          username={username}
          room={4}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
       
    </div>
  )
}

export default AllChatsBody;
