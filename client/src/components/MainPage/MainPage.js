import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useState, useEffect } from 'react';
import { socket } from '../../redux/socket/socketIO';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFirebaseUserId } from '../../redux/features/users/userSlice';
import { getChatLogsByFirebaseUserId } from '../../redux/features/chatLogs/chatLogSlice';



const MainPage = () => {

    const dispatch = useDispatch()

    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState(`User_${Math.floor(Math.random()*1000)}`)
    const [room, setRoom] = useState(99)

    const joinRoom = (data) => {
        socket.emit("join", data)
    }

    useEffect(() => {
        setConnected(true)
    }, [socket])

    useEffect(() => {
        joinRoom({room: 99})
    }, [])

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

    // load all chats into redux store
    const loadChats = async () => {
        console.log("loading chats...")
        await Promise.resolve(dispatch(getChatLogsByFirebaseUserId(firebaseUserId)))
    }
    loadChats()


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