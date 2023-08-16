import './UnreadMessageCount.css';

const UnreadMessageCount = ({ count }) => {

    return (
        <div className="unread-message-count">
            <p>{count}</p>
        </div>
    )
}

export default UnreadMessageCount;