import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFirebaseUserId } from '../../redux/features/users/userSlice';

const URL = "http://localhost:8080/"
const socket = io.connect(URL)

const MainPage = () => {

    const dispatch = useDispatch()

    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState(`User_${Math.floor(Math.random()*1000)}`)
    const [room, setRoom] = useState(100)

    const joinRoom = (data) => {
        socket.emit("join", data)
    }

    useEffect(() => {
        setConnected(true)
    }, [socket])


    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    const userError = useSelector(state => state.user.userError)

    useEffect(() => {

        if (firebaseUserId) {
            try {
                dispatch(getUserByFirebaseUserId( { firebaseUserId } ))
            } catch (error) {
                console.log(error, userError)
            }
        } else {
            console.log("no id") // send to error/loading page
        }

    }, [firebaseUserId, dispatch])


    return (
        <div className="main-page">
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
        </div>
    );
    }

    export default MainPage;


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