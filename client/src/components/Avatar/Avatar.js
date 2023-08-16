import './Avatar.css';
import { useMemo } from 'react';

const Avatar = ({ letter, width=55, height=55, borderRadiusPixels=15 }) => {

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadiusPixels}px`
    }

    const rand1 = useMemo(() => {
        return Math.floor(Math.random()*26)
    }, [])

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    return (
        <div className="avatar" style={style}>
            <img src={`${letters[rand1]}.jpeg`}/>
        </div>
    )
}

export default Avatar;