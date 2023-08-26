import './UnreadMessageCount.css';

const UnreadMessageCount = ({ count }) => {

    const displayCount = count > 99 ? "99+" : count

    return (
        <div className="unread-message-count">
            <p>{displayCount}</p>
        </div>
    )
}

export default UnreadMessageCount;