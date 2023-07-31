import './ChatGroup.css';

const ChatGroup = ({ connected, roomName, room, setRoom, joinRoom }) => {


  return (
    <div className="chat-group" >

            <img src="man.png" className='chat-group__avatar'/>

            <div className='chat-group__message'>
                <div className='message__sender'>
                    <p>{roomName}</p>
                </div>
                <div className='message__preview'>
                    <p>Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua..
                    </p>
                </div>
    
            </div>

            <div className='chat-group__meta-data'>
                <div className='meta-data__time'>
                    <p>21:30</p>
                </div>
            </div>
     
  
    </div>
  );
}

export default ChatGroup

            /* <input 
                type="text" 
                placeholder='room'
                onChange={(e) => setRoom(e.target.value)}
                value={username}
                disabled
            />

            <button 
                onClick={() => joinRoom({room})}>
                Username
            </button>
            

            <input 
                type="text" 
                placeholder='room'
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                disabled
            />

            <button 
                onClick={() => joinRoom({room})}>
                Join Room
            </button> */