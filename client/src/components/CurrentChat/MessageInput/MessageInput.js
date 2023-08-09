import './MessageInput.css';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import EmojiPicker from 'emoji-picker-react';
import CancelIcon from '@mui/icons-material/Cancel';

const MessageInput = ({setCurrentMessage, currentMessage, sendMessage}) => {

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage()
        }
    }
 
    const onEmojiClick = (event) => {
        setCurrentMessage(prev => prev + event.emoji)
    }

    const [emojiKeyboardVisible, setEmojiKeyboardVisible] = useState(false)

    const handleupdateMessage = (e) => {
        setCurrentMessage(e.target.value)
    }

    return (
        <>
            <div className={`emoji-keyboard ${emojiKeyboardVisible ? "show" : "hide"}`}>
                <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    height={450} width={340}
                    searchDisabled={true}
                />
            </div>
    
            <div className="message-input">

                <div className='message-input__buttons'>
                    {
                        emojiKeyboardVisible ?
                        <CancelIcon
                            className='cancel-icon'
                            onClick={() => setEmojiKeyboardVisible(prev => !prev)}
                        />

                        :

                        <SentimentSatisfiedRoundedIcon
                            className='emoji-icon'
                            onClick={() => setEmojiKeyboardVisible(prev => !prev)}
                        />
                    }
         
                </div> 

                <textarea
                    type="text"
                    rows="1"
                    placeholder='Your message'
                    onChange={(e) => handleupdateMessage(e)}
                    value={currentMessage}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                
                <div className='message-input__buttons'>
                    <SendIcon
                        className='buttons__send'
                        onClick={sendMessage}
                    />   
                </div> 
            </div>

        </>
    )
}

export default MessageInput;