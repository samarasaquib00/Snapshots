import React, {useState} from 'react'
import './SignUpBox.css'
import Icon from '../Icon.png';
import Button from '@mui/material/Button';
import Popup from './Popup';
import { Link } from 'react-router-dom';

function SignUpBox() {

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className= 'signup'>
            <div className= 'signup_block'>
                <img src={Icon} alt=""/>
                <h1>Sign Up for Snapshots</h1>
                <div className= 'email'>
                    <input placeholder= 'Email Address'/>
                </div>
                <div className= 'username'>
                    <input placeholder= 'Username'/>
                </div>
                <div className= 'password'>
                    <input placeholder= 'Password'/>
                </div>
                <div className= 'confirm_password'>
                    <input placeholder= 'Confirm Password'/>
                </div>
                <div className= 'button'>
                    <Button /*component= {Link} to='/photolibrary'*/ variant="contained" size= 'large' onClick={togglePopup}>Sign Up</Button>
                    {isOpen && <Popup
                    content={<>
                        <b>Sign Up Error</b>
                        <p>We were unable to sign you up for an account. Please try again.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>
            </div>
        </div>
    )
}

export default SignUpBox
