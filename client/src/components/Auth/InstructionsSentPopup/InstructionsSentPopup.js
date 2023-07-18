import './InstructionsSentPopup.css';

const InstructionsSentPopup = ({showPopup, setShowPopup, email}) => {
 
    return (
        <div className={`modal-background ${showPopup ? null : "hide-page"}`}>
            <div className="instructions-sent-popup">
                <h3>Instructions sent!</h3>
                <h4>
                    We sent instructions to change your password to&nbsp;
                    <span style={{fontWeight:"900"}}>{email}</span>. 
                    Please check both your inbox and spam folder.
                </h4>
                <button className='close-popup-button' onClick={() => setShowPopup(false)}>Okay</button>
            </div>
        </div>
    );
}

export default InstructionsSentPopup;