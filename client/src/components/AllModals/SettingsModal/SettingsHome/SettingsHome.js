import './SettingsHome.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

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
                        onClick={() => handleNavigation('/settings/delete-account')}
                    />
                </div>
            </div>
        </>
    )
}

export default SettingsHome;