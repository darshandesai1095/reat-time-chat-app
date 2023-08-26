import './SettingsHome.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';


const SettingsHome = ({handleNavigation}) => {

    return (
        <>
            <h3 className='settings-header'>Settings</h3>
            <div className='settings-items'>
                <div className='settings-item'>
                    <h4>
                        Change Username
                    </h4>
                    <ArrowForwardRoundedIcon
                        className='settings-icon'
                        onClick={() => handleNavigation('/settings/update-username')}
                    />
                </div>
                {/* <div className='settings-item'>
                    <h4>
                        Update Email
                    </h4>
                    <ArrowForwardRoundedIcon
                        className='settings-icon'
                        onClick={() => handleNavigation('/settings/update-email')}
                    />
                </div> */}
                <div className='settings-item'>
                    <h4>
                        Change Profile Picture
                    </h4>
                    <ArrowForwardRoundedIcon
                        className='settings-icon'
                        onClick={() => handleNavigation('/settings/update-profile-picture')}
                    />
                </div>
                <div className='settings-item'>
                    <h4>
                        Delete Account
                    </h4>
                    <ArrowForwardRoundedIcon
                        className='settings-icon'
                        onClick={() => handleNavigation('/settings/update-delete-account')}
                    />
                </div>
            </div>
        </>
    )
}

export default SettingsHome;