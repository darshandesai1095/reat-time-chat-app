import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import AllChats from '../AllChats/AllChats';
import CurrentChat from '../CurrentChat/CurrentChat';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserByFirebaseUserId } from '../../redux/features/users/userSlice';
import { getChatLogsByFirebaseUserId } from '../../redux/features/chatLogs/chatLogSlice';
import { socket, socketIoListenForMessage, socketIoHeartbeat } from '../../redux/socket/socketIO';
import { socketIoJoinRooms } from '../../redux/features/chatLogs/chatLogSlice';
import { getLastActiveFromLocalStorage } from '../../functions/misc/localStorage';
import { syncActivityLogWithLocalStorage } from '../../redux/features/activityLogs/activityLogSlice';
import Modal from '../Modal/Modal';

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
        await Promise.resolve(dispatch(getChatLogsByFirebaseUserId(firebaseUserId)))
    }
    loadChats()

    const joinRoomsSocketIo = async () => {
        if (roomsArray) {
            await Promise.resolve(dispatch(socketIoJoinRooms(roomsArray)))
        }
    }

    useEffect(() => {
        joinRoomsSocketIo()
    }, [roomsArray])


    // get activity log from local storage and save to redux store
    useEffect(() => {
        if (userId !== null) {
            const activityLog = getLastActiveFromLocalStorage(userId)
            dispatch(syncActivityLogWithLocalStorage(activityLog))
        }
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