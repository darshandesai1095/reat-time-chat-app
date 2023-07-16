import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './App.css';
import Chat from './components/MainChat/Chat/Chat';
import Groups from './components/MainGroups/Groups/Groups';

const URL = "http://localhost:3001/"
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

        <Groups
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
