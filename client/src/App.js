import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './App.css';
import Chat from './components/Chat/Chat';

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

    return () => {
      socket.disconnect()
    }

  }, [socket])


  return (
    <div className="App">
      { connected ? "connected" : "not connected"}

      <div>
      <input 
          type="text" 
          placeholder='room'
          onChange={(e) => setRoom(e.target.value)}
          value={username}
          disabled
        />
        <button 
          onClick={() => joinRoom({room})}>
            Username
        </button>
        <br/>
        <input 
          type="text" 
          placeholder='room'
          onChange={(e) => setRoom(e.target.value)}
          value={room}
          disabled
        />
        <button 
          onClick={() => joinRoom({room})}>
            Join Room
        </button>

        <Chat
          socket={socket}
          room={room}
          username={username}
        />
       
      </div>
    </div>
  );
}

export default App;
