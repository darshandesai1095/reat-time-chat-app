// import { useDispatch } from 'react-redux';
import './StartNewChat.css';
// import { toggleCreateNewGroupModal } from '../../../redux/features/modals/modalSlice';

const StartNewChat = () => {

  // const dispatch = useDispatch()

  // const handleOpenModal = () => {
  //   dispatch(toggleCreateNewGroupModal())
  // }

  return (
        <div className="start-new-chat">
            {/* <AddCircleIcon/> */}
            <h3>
                No chats to display
                {/* <br/>
                Click <span onClick={handleOpenModal}>here</span> to create new group. */}
            </h3>
        </div>
  )
}

export default StartNewChat;
