import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFirebaseUserId } from '../../redux/features/users/userSlice';
import { getChatLogsByFirebaseUserId, socketIoLeaveRooms } from '../../redux/features/chatLogs/chatLogSlice';
import { socketIoListenForMessage, checkOnlineStatus } from '../../redux/socket/socketIO';
import { socketIoJoinRooms } from '../../redux/features/chatLogs/chatLogSlice';
import { getLastActiveFromLocalStorage } from '../../functions/misc/localStorage';
import { syncActivityLogWithLocalStorage } from '../../redux/features/activityLogs/activityLogSlice';
import Modal from '../Modal/Modal';
import { socketIoListenForGlobalAlert } from '../../redux/socket/socketIO';


const MainPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        socketIoListenForMessage(dispatch)
        // socketIoHeartbeat()
    }, [dispatch])

    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    const userId = useSelector(state => state.user.mongoDbUserId)
    const username = useSelector(state => state.user.username)
    const userError = useSelector(state => state.user.userError)
    const roomsArray = useSelector(state => state.user.rooms)
    const roomsActivityLog = useSelector(state => state.activityLog?.lastActive)
    

    const [transmissionIDs, setTransmissionIDs] = useState({})
    useEffect(() => {
        if (!userId) {return}
        checkOnlineStatus(dispatch)
        socketIoListenForGlobalAlert(dispatch, userId, roomsArray, roomsActivityLog, transmissionIDs, setTransmissionIDs)
        // eslint-disable-next-line
    }, [userId, dispatch])


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
        // eslint-disable-next-line
    }, [firebaseUserId, dispatch])


    // load all chats into redux store
    const loadChats = async () => {
        await Promise.resolve(dispatch(getChatLogsByFirebaseUserId(firebaseUserId)))
    }
    useEffect(() => {
        if (!firebaseUserId) {return}
        loadChats()
        // eslint-disable-next-line
    }, [])


    const joinRoomsSocketIo = async () => {
        if (roomsArray) {
            console.log("joining rooms", {username:username, roomsArray:roomsArray})
            await Promise.resolve(dispatch(socketIoJoinRooms({username:username, roomsArray:roomsArray, userId:userId})))
        }
    }
    const leaveRoomsSocketIo = async () => {
        if (roomsArray) {
            console.log("leaving rooms", username)
            await Promise.resolve(dispatch(socketIoLeaveRooms(roomsArray)))
        }
    }
    useEffect(() => {
        joinRoomsSocketIo()
        return (() => {
            leaveRoomsSocketIo()
        })
        // eslint-disable-next-line
    }, [roomsArray])


    // get activity log from local storage and save to redux store
    useEffect(() => {
        if (userId !== null) {
            const activityLog = getLastActiveFromLocalStorage(userId)
            dispatch(syncActivityLogWithLocalStorage(activityLog))
        }

        // eslint-disable-next-line
    }, [userId])


    return (
        <div className="main-page">
                <NavBar/>
                <AllChats/>
                <CurrentChat/>
                <Modal/>
        </div>
    )
}

export default MainPage