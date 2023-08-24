import './Avatar.css';
import { useMemo } from 'react';
import imagesArray from '../../imagesArray';


const Avatar = ({ url, width=55, height=55, responsive=false, isSelectedPicture, setSelectedPictureUrl}) => {

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
    }

    const rand1 = useMemo(() => {
        return Math.floor(Math.random() * (imagesArray.length-1))
    }, [])
    
    const handleClick = () => {
        setSelectedPictureUrl(url)
    }

    return (
        <div 
            className={`
                avatar 
                ${responsive ? "avatar-responsive" : null} 
                ${isSelectedPicture ? "avater__selected-picture" : null}
            `} 
            style={style}
            onClick={responsive ? handleClick : null}
            >

            {
                url ?
                <img src={url}/>
                :
                <img src={`https://i.postimg.cc/13JNx5YY/image-Ot-ILHw-Wp-NCPt.jpg`}/>
             }

        </div>
    )
}

export default Avatar;