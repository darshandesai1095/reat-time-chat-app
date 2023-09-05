import './Info.css';


const Info = ({ setInfoVisible }) => {

    return (
        <div className="menu__info">
            <div className="info__body">
                <p>
                    For more information about this project please visit &nbsp;
                    <span onClick={() => window.open("https://github.com/darshandesai1095/chat-app", "_blank")}>
                        my GitHub repository
                    </span> &nbsp;
                </p>
            </div>
           
        </div>
    )
}

export default Info;