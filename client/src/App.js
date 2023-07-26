import './App.css';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import AuthenticationPage from './components/Auth/AuthenticationPage/AuthenticationPage';
import { auth } from './firebase';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import AllChats from './components/AllChats/AllChats';
import CurrentChat from './components/CurrentChat/CurrentChat';
import CreateNewGroupModal from './components/AllChats/CreateNewGroupModal/CreateNewGroupModal';
import NavBar from './components/NavBar/NavBar';

import { useSelector, useDispatch } from 'react-redux'
import { loginRequest, loginSuccess, loginFailure, logout } from './redux/features/auth/authSlice';

const URL = "http://localhost:4000/"
const socket = io.connect(URL)

const App = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState(`User_${Math.floor(Math.random()*1000)}`)
  const [room, setRoom] = useState(100)
  const [signedIn, setSignedIn] = useState(false)

  const joinRoom = (data) => {
    socket.emit("join", data)
  }

  useEffect(() => {
    setConnected(true)
  }, [socket])


  return (
    <div className="App">
      { 
        isAuthenticated ? (

          // <>
          //   <GroupsCol 
          //     connected={connected}
          //     username={username}
          //     room={room}
          //     setRoom={setRoom}
          //     joinRoom={joinRoom}
          //   />
    
          //   <Chat
          //     socket={socket}
          //     room={room}
          //     username={username}
          //   />
          // </>
          <>
              <NavBar/>
              <AllChats/>
              <CurrentChat
                socket={socket}
                connected={connected}
                username={username}
                room={room}
                setRoom={setRoom}
                joinRoom={joinRoom}
              />
          </>

        ) : (

          <AuthenticationPage/>

        )
      }

       
    </div>
  );
}

export default App;
