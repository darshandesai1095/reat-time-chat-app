import { useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

const URL = "http://localhost:3001/"
const socket = io.connect(URL)

const App = () => {

  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("")
  
  useEffect(() => {
    setConnected(true)

    // return () => {
    //   socket.disconnect()
    // }

  }, [socket])

  const handleSendMessage = (data) => {
    socket.emit("fromClient", data)
    setMessage("")
  }

  return (
    <div className="App">
      { connected ? "connected" : "not connected"}

      <div>
      <input 
          type="text" 
          placeholder='room'
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
        <input 
          type="text" 
          placeholder='message'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button 
          onClick={() => handleSendMessage({message, room})}>
            Send
        </button>
      </div>
    </div>
  );
}

export default App;
