import './MessageInput.css';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

const MessageInput = ({setCurrentMessage, currentMessage, sendMessage}) => {

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage()
        }
    }

    const iconStyle = {
        transform: "scale(0.8)",
        opacity: "1"
    }


    return (
        <div className="message-input">
            <textarea
                type="text"
                rows="1"
                placeholder='Message...'
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
                onKeyDown={(e) => handleKeyDown(e)}
            >
            </textarea>
            
            <div className='message-input__buttons'>
                <AttachFileIcon/>
                <SentimentSatisfiedRoundedIcon/>
                <SendIcon
                    className='buttons__send'
                    onClick={sendMessage}
                />   
            </div> 
        </div>
    )
}

export default MessageInput;
