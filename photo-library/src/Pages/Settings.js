import React, {useState} from 'react'
import ToggleSwitch from '../Components/ToggleSwitch'
import './Settings.css'
import Popup from '../Components/Popup';
import Button from '@mui/material/Button';

function Settings() {
    const [value, setValue] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    return (
        <div className='page'>
            <h1>Settings Page</h1>
            <div className='account_info'>
                <h2>Account Information</h2>
                <p>Email Address</p>
                <div className= 'new_email'>
                    <input placeholder= 'Email Address'/>
                </div>
                <p>Username</p>
                <div className= 'new_username'>
                    <input placeholder= 'Username'/>
                </div>
                <div className= 'update_account_button'>
                        <Button variant="contained" size= 'large' onClick={togglePopup}>Update Account</Button>
                        {isOpen && <Popup
                        content={<>
                        <b>Update Error</b>
                        <p>We were unable to change your account information.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>
            </div>
            <div className='password_section'>
                <h2>Password</h2>
                <div className='password_option'>
                    <p>Toggle Multi-Factor Authentication</p>
                    <ToggleSwitch isOn={value} handleToggle={() => setValue(!value)} />
                </div>
                <div className='password_change'>
                    <p>Change Your Password</p>
                    <div className= 'new_password'>
                        <input placeholder= 'Password'/>
                    </div>
                    <div className= 'confirm_new_password'>
                        <input placeholder= 'Confirm Password'/>
                    </div>
                    <div className= 'update_button'>
                        <Button variant="contained" size= 'large' onClick={togglePopup}>Update Password</Button>
                        {isOpen && <Popup
                        content={<>
                        <b>Update Error</b>
                        <p>We were unable to change your password.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
