import './MessageInput.css';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
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
                <input 
                    type="text"
                    rows="2"
                    placeholder='Message...'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    value={currentMessage}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                
                <div className='message-input__buttons'>
                    <AttachFileIcon/>
                    <SentimentSatisfiedRoundedIcon/>
                    <DeleteForeverRoundedIcon/>
                    &nbsp;
                    <SendIcon 
                        className='buttons__send'
                        onClick={sendMessage}>
                    </SendIcon>
                </div> 
        </div>
    )
}

export default MessageInput;
