import './StartNewChat.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import createNewRoomAndSyncData from '../../../functions/rooms/createNewRoomAndSyncData';



const StartNewChat = ({}) => {


  return (
        <div className="start-new-chat">
            {/* <AddCircleIcon/> */}
            <h3>
                No chats to display
            </h3>
        </div>
  )
}

export default StartNewChat;
