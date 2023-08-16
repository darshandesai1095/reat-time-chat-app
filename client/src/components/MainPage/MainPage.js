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
import { getLastActiveFromLocalStorage, setLastActiveInLocalStorage } from '../../functions/misc/localStorage';
import { syncActivityLogWithLocalStorage, updateActivityLog } from '../../redux/features/activityLogs/activityLogSlice';

const MainPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        socketIoListenForMessage(dispatch)
        socketIoHeartbeat()
    }, [socket])

    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    const userId = useSelector(state => state.user.mongoDbUserId)
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

    // get activity log from local storage and save to redux store
    const activityLog = useSelector(state => state.activityLog.lastActive)
    useEffect(() => {
        if (userId !== null) {
            const activityLog = getLastActiveFromLocalStorage(userId)
            console.log("main page activity log", activityLog)
            dispatch(syncActivityLogWithLocalStorage(activityLog))
        }

        console.log("redux store log", activityLog)
        

    }, [userId])

    // // save activity log from redux store to local storage
    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         if (userId) {
    //             setLastActiveInLocalStorage(userId, activityLog)
    //         }
    //     }

    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     return () => {
    //         // Remove the event listener when the component unmounts
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [])


    return (
        <div className="main-page">
                <NavBar/>
                <AllChats/>
                <CurrentChat/> 
        </div>
    );
    }

    export default MainPage;