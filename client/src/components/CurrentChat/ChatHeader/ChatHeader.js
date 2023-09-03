import './ChatHeader.css';
import ChatHeaderMenu from '../ChatHeaderMenu/ChatHeaderMenu';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar'
import { toggleShowChangeGroupIconModal } from '../../../redux/features/modals/modalSlice';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';


const ChatHeader = () => {

    const dispatch = useDispatch()

    const roomId = useSelector(state => state.rooms.currentActiveRoomId)
    const roomsData = useSelector(state => state.rooms.roomsData)
    const currentActiveRoomIndex = roomsData?.findIndex(room => room.roomId === roomId)

    const numberOfMembers = roomsData ? roomsData[currentActiveRoomIndex]?.roomUsers?.length : null

    const roomMembersList = roomsData ? roomsData[currentActiveRoomIndex]?.roomUsers?.map(userObj => userObj.userId) : null
    const onlineUsersList = useSelector(state => state.onlineUsers.onlineUsersList)
    let numberOfMembersOnline = 0
    roomMembersList?.forEach(userId => {
        if (  onlineUsersList?.includes(userId) ) {
            numberOfMembersOnline+=1
        }
    })
        

    const displayNumberOfMembers = (numberOfMembers = null) => {
        if (numberOfMembers === null || numberOfMembers === undefined) {
            return (
                <div>
                    <p className='meta-data__members'>
                    Loading...
                    </p>
                    <ArrowDropDownRoundedIcon className='hidden' />
                </div>

            )
        }
        if (Number(numberOfMembers) === 1) {
            return (
                <div>
                    <p className='meta-data__members'>
                        1 member
                    </p>
                    <ArrowDropDownRoundedIcon className='hidden' />
                </div>
            )
        }
        return (
            <div>
                <p className='meta-data__members'>
                    {numberOfMembers} members, {numberOfMembersOnline} online
                </p>
                <ArrowDropDownRoundedIcon className='hidden' />
            </div>
        )
    }
    

    return (
        <>

        <div className='chat-header'>

            <div className='chat-header__group-info'>

                <div className='chat-header__avatar' onClick={() => dispatch(toggleShowChangeGroupIconModal())}>
                    <Avatar
                        width="50"
                        height="50"
                        url=  {roomsData ? roomsData[currentActiveRoomIndex]?.profilePictureUrl : null}
                        isSelectedPicture={null}
                        setSelectedPictureUrl={null}
                        responsive={false}
                    />
                </div>
       
                <div className='chat-header__meta-data'>
                        {/* {
                            isLoading ?

                            <h3 className='meta-data__group-name'>
                                Loading...
                            </h3>
                            : */}
                            <h3 className='meta-data__group-name'>
                                {roomsData[currentActiveRoomIndex]?.roomName ? roomsData[currentActiveRoomIndex]?.roomName : "Loading..."}
                            </h3>
                        {/* } */}

                    {displayNumberOfMembers(numberOfMembers)}

                </div>

            </div>

           <ChatHeaderMenu/>

        </div>
        </>
    )
}

export default ChatHeader