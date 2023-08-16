import './NavBar.css';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';



const NavBar = () => {

    const style = {
        transform: "scale(0.8)"
    }

    return (
        <div className="nav-bar">
            <div className='nav-bar__primary'>

                <div className='icons'>
                    <AddBoxRoundedIcon style={style}/>
                    <p>New Chat</p>
                </div>

                <div className='icons'>
                    <ForumRoundedIcon style={style}/>
                    <p>Chats</p>
                </div>

                <div className='icons'>
                    <CropSquareRoundedIcon style={style}/>
                    <p>Sandbox</p>
                </div>
                
                <div className='icons'>
                    <InfoRoundedIcon style={style}/>
                    <p>About</p>
                </div>

            </div>

            <div className='nav-bar__secondary'>
                <div className='icons'>
                    <SettingsRoundedIcon style={style}/>
                    <p>Settings</p>
                </div>
                <div className='icons'>
                    <LogoutRoundedIcon style={style}/>
                    <p>Logout</p>
                </div>     
            </div>

        </div>
    )
}

export default NavBar;