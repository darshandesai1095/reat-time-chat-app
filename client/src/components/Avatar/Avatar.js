import './Avatar.css';

const Avatar = ({ url, width=55, height=55, responsive=false, isOnline=false, isSelectedPicture, setSelectedPictureUrl}) => {

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        borderRadius: "30%"
    }
    
    const handleClick = () => {
        setSelectedPictureUrl(url)
    }

    return (
        <div 
            className={`
                avatar
                ${responsive ? "avatar-responsive" : null} 
                ${isSelectedPicture ? "avater__selected-picture" : null}
                ${isOnline ? "online" : null}
            `} 
            style={style}
            onClick={responsive ? handleClick : null}
            >

            {
                url ?
                <img  className={`${ isOnline && url ? "online" : null }`} src={url} alt="avatar"/>
                :
                <img
                    src={`https://i.postimg.cc/13JNx5YY/image-Ot-ILHw-Wp-NCPt.jpg`}
                    alt="avatar"
                />
             }

        </div>
    )
}

export default Avatar;