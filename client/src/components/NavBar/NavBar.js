import './NavBar.css';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const NavBar = () => {

    return (
        <div className="nav-bar">
            <div className='nav-bar__logo'>
                <ForumRoundedIcon/>
                <CropSquareRoundedIcon/>
                <InfoRoundedIcon/>
            </div>

            <div className='nav-bar__icons'>
                <SettingsRoundedIcon/>
                <LogoutRoundedIcon/>        
            </div>

        </div>
    )
}

export default NavBar;