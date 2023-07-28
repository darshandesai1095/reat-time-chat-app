import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserByFirebaseUserIdQuery } from '../../redux/api/users/userApi';
import { updateUserCredentials } from '../../redux/features/users/userSlice';


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
    
    const firebaseUserId = useSelector(state => state.auth.firebaseUserId)
    const {data: userInfo, isError, isLoading} = useGetUserByFirebaseUserIdQuery(firebaseUserId)
    dispatch(updateUserCredentials({
        username: userInfo?.username || null,
        mongoDbUserId: userInfo?.mongoDbUserId || null
    }))


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