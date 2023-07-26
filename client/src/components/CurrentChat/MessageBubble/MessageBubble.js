import './MessageBubble.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const MessageBubble = ({user, prevMessageUser, messageData}) => {

    const { room, username, currentMessage, time } = messageData

    return (
        <div className={`message-bubble ${username === user ? "align-right" : null}`}>

            <p className={`message-bubble__username ${prevMessageUser === username ? "hidden" : "visible"}` }>
                {username}
            </p>

            <div className="message-bubble__main">
                <p className='main__message'>{currentMessage}</p>
                <div className='main__meta-data'>
                    <p className='meta-data__time'>{time}</p>
                    <p className='meta-data__add-to-list'></p>
                </div>
            </div>

        </div>
    )
}

export default MessageBubble;
