import './GroupsCol.css';
import GroupsMenu from "../GroupsMenu/GroupsMenu"
import Group from "../Group/Group"

const GroupsCol = ({connected, username, room, setRoom, joinRoom}) => {

  return (

    <div className="groups-col">

        <GroupsMenu/>

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
  );
}

export default GroupsCol;
