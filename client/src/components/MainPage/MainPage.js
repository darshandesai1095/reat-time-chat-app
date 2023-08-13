import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFirebaseUserId } from '../../redux/features/users/userSlice';
import { getChatLogsByFirebaseUserId } from '../../redux/features/chatLogs/chatLogSlice';
import { socket, socketIoListenForMessage, socketIoHeartbeat } from '../../redux/socket/socketIO';
import { socketIoJoinRooms } from '../../redux/features/chatLogs/chatLogSlice';

const MainPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        socketIoListenForMessage(dispatch)
        socketIoHeartbeat()
    }, [socket])

    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    const userError = useSelector(state => state.user.userError)
    const roomsArray = useSelector(state => state.user.rooms)

    useEffect(() => {

        const getUserInfo = async () => {
            if (firebaseUserId) {
                try {
                    dispatch(getUserByFirebaseUserId( { firebaseUserId } ))
                } catch (error) {
                    console.log("Error getting user data", error, userError)
                }
            } else {
                console.log("no id") // send to error / loading page
            }
        }
        
        Promise.resolve(getUserInfo())

    }, [firebaseUserId])


    // load all chats into redux store
    const loadChats = async () => {
        console.log("loading chats...")
        await Promise.resolve(dispatch(getChatLogsByFirebaseUserId(firebaseUserId)))
    }
    loadChats()

    const joinRoomsSocketIo = async () => {
        console.log("joinRoomsSocketIo ...")
        if (roomsArray) {
            await Promise.resolve(dispatch(socketIoJoinRooms(roomsArray)))
        }
    }
    joinRoomsSocketIo()


    return (
        <div className="main-page">
                <NavBar/>
                <AllChats/>
                <CurrentChat/> 
        </div>
    );
    }

    export default MainPage;