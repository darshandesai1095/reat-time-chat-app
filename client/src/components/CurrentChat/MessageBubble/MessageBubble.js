import { useSelector } from 'react-redux';
import './MessageBubble.css';


const MessageBubble = ({ prevMessageSender, messageObj }) => {

    const { username, senderId, messageContent, dateCreated, messageId, deliveryStatus } = messageObj
    const clientUsername = useSelector(state => state.user.username)
    const clientsenderId = useSelector(state => state.user.senderId)

    return (
        <div className={`message-bubble ${ username === clientUsername ? "align-right" : null}`}>

            <p className={`message-bubble__username ${prevMessageSender === username ? "hidden" : "visible"}` }>
                {username || "unidentified user"}
            </p>

            <div className="message-bubble__main">
                <p className='main__message'>{messageContent}</p>
                <div className='main__meta-data'>
                    <p className='meta-data__time'>{dateCreated}</p>
                    <p>{deliveryStatus}</p>
                </div>
            </div>

        </div>
    )
}

export default MessageBubble;
