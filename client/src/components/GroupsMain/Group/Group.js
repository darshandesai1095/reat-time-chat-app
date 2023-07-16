import './Group.css';

const Group = ({ connected, username, room, setRoom, joinRoom }) => {


  return (
    <div className="group" >

            <img src="man.png" className='group__avatar'/>
            <div className='group__info'>

                <div className='info__row'>
                    <div className='info__name'>
                        <p>Joe Bloggs</p>
                    </div>
                    <div className='info__time'>
                        <p>21:30</p>
                    </div>
                </div>
 
                <div className='info__row'>
                    <div className='info__message'>
                        <p>This is a test message...</p>
                    </div>
                    <div className='info__meta'>
                        <p></p>
                    </div>
                </div>
     
            </div>
  
    </div>
  );
}

export default Group;

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