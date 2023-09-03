import './AllChats.css';
import { useState, useEffect } from 'react';
import AllChatsBody from './AllChatsBody/AllChatsBody';
import AllChatsSearchBar from './AllChatsSearchBar/AllChatsSearchBar';
import CreateNewGroupModal from '../AllModals/CreateNewGroupModal/CreateNewGroupModal';
import { useSelector, useDispatch } from 'react-redux'
import { getRoomsByFirebaseUserId } from '../../redux/features/rooms/roomSlice';
import LoadingModal from '../AllModals/LoadingModal/LoadingModal';

const AllChats = () => {

    const dispatch = useDispatch()
    const firebaseUserId = useSelector(state => state.user.firebaseUserId)
    const isLoading = useSelector(state => state.rooms.loading)

    useEffect(() => {
        if (firebaseUserId) {
            try {
                dispatch(getRoomsByFirebaseUserId(firebaseUserId))
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("no id") // send to error / loading page
        }

    }, [firebaseUserId, dispatch])

    const [search, setSearch] = useState("")
    const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false)

    return (
        <div className="all-chats" >
            <AllChatsSearchBar 
                search={search}
                setSearch={setSearch}
            />
            <AllChatsBody
                search={search}
            />

            {
                isLoading ?

                <LoadingModal/>
                :
                <CreateNewGroupModal
                    showCreateGroupPopup={showCreateGroupPopup}
                    setShowCreateGroupPopup={setShowCreateGroupPopup}
                /> 
            }
        </div>
    )
}

export default AllChats;