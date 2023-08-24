import './LoadingModal.css';
import ReactLoading from 'react-loading';

const LoadingModal = () => {

    return (
        <div className={`loading__modal-background`}>
            <div className="loading">
                <ReactLoading type="bars" color="white" height={100} width={100} />
                {/* <h3>Creating Group</h3> */}
            </div>
        </div>
    );
}

export default LoadingModal;