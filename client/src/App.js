import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './App.css';
import Chat from './components/ChatMain/Chat/Chat';
import GroupsCol from './components/GroupsMain/GroupsCol/GroupsCol';

const URL = "http://localhost:4000/"
const socket = io.connect(URL)

const App = () => {

  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState(`User_${Math.floor(Math.random()*1000)}`)
  const [room, setRoom] = useState(100)

  const joinRoom = (data) => {
    socket.emit("join", data)
  }

  useEffect(() => {
    setConnected(true)
  }, [socket])


  return (
    <div className="App">

      <GroupsCol 
        connected={connected}
        username={username}
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
      />

      <Chat
        socket={socket}
        room={room}
        username={username}
      />
       
    </div>
  );
}

export default App;
