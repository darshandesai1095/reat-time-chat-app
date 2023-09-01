import { useDispatch, useSelector } from 'react-redux';
import { toggleShowSettingsModal } from '../../../redux/features/modals/modalSlice';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import SettingsUpdateProfilePic from './SettingsUpdateProfilePic/SettingsUpdateProfilePic';
import SettingsHome from './SettingsHome/SettingsHome';
import { useEffect, useState } from 'react';
import SettingsUpdateUsername from './SettingsUpdateUsername/SettingsUpdateUsername';
import SettingsDeleteAccount from './SettingsDeleteAccount/SettingsDeleteAccount';
import './SettingsModal.css';


const SettingsModal = () => {


    const renderContent = (virtualPathname) => {
        if (virtualPathname === '/settings') {
            setContent(<SettingsHome
                            handleNavigation={handleNavigation}
                        />)
            return
        }
        if (virtualPathname === '/settings/update-username') {
            setContent(<SettingsUpdateUsername
                            handleNavigation={handleNavigation}
                            modalTitle="Enter New Username"
                            buttonDescription="Update Username"
                        />)
            return
        }
        if (virtualPathname === '/settings/update-profile-picture') {
            setContent(<SettingsUpdateProfilePic
                            handleNavigation={handleNavigation}
                            modalTitle="Select Profile Picture"
                            buttonDescription="Update Avatar"

                        />)
            return
        }
        if (virtualPathname === '/settings/delete-account') {
            setContent(<SettingsDeleteAccount
                handleNavigation={handleNavigation}
                modalTitle="Delete Account"
                buttonDescription="Delete"
            />)
            return 
        }  
    }

    const handleNavigation = (newPathname) => {
        // Update the virtual pathname without changing the URL
        setVirtualPathname(newPathname)
        renderContent(newPathname)
    }

    const [virtualPathname, setVirtualPathname] = useState('/settings')
    const [content, setContent] = useState( <SettingsHome handleNavigation={handleNavigation}/> )

    const dispatch = useDispatch()
    const showSettingsModal = useSelector(state => state.modals.showSettingsModal)

    const handleClosePopup = () => {
        dispatch(toggleShowSettingsModal())
        handleNavigation('/settings')
    }

    useEffect(() => {}, [virtualPathname])

    return (

        <div className={`modal-background ${ showSettingsModal ? null : "hide-page"}`}>
            
            <div className={`create-new-group settings ${virtualPathname ==='/settings/update-profile-picture' ? "avatar-selection" : null}`}>
                <div className='settings-header'>
                    {   
                        virtualPathname !== "/settings" ?

                        <div className='back-icon'>
                            <OutboundRoundedIcon
                                onClick={() => handleNavigation('/settings')}
                            />
                        </div>
                        :
                        null
                    }

                    <div className='close-icon'>
                        <CancelRoundedIcon
                            onClick={handleClosePopup}
                        />
                    </div>
                </div>

                <div className='settings__body'>
                    { content }
                </div>

            </div>
        </div>
    )
}

export default SettingsModal;