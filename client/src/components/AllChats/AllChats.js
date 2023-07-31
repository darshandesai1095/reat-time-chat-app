import './AllChats.css';
import { useState, useEffect } from 'react';
import AllChatsBody from './AllChatsBody/AllChatsBody';
import AllChatsHeader from './AllChatsHeader/AllChatsHeader';
import CreateNewGroupModal from './CreateNewGroupModal/CreateNewGroupModal';
import { useSelector, useDispatch } from 'react-redux'
import { getRoomsByFirebaseUserId } from '../../redux/features/rooms/roomSlice';




const AllChats = ({}) => {

    const dispatch = useDispatch()
    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    console.log("all chats: ", firebaseUserId)
    useEffect(() => {

        if (firebaseUserId) {
            try {
                dispatch(getRoomsByFirebaseUserId( firebaseUserId ))
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("no id") // send to error/loading page
        }

    }, [])

    const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false)

    return (
        <div className="all-chats" >
            <AllChatsHeader
                setShowCreateGroupPopup={setShowCreateGroupPopup}
            />
            <AllChatsBody/>

            <CreateNewGroupModal
                showCreateGroupPopup={showCreateGroupPopup}
                setShowCreateGroupPopup={setShowCreateGroupPopup}
            />
        </div>
    )
}

export default AllChats;