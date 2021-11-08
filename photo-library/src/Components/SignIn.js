import React, {useState, useRef} from 'react'
import './SignIn.css';
import Icon from '../Icon.png';
import Button from '@mui/material/Button';
import Popup from '../Components/Popup';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

function SignIn() {

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
  
        emailjs.sendForm('gmail', 'template_yprqypf', form.current, 'user_KT30rvnEd5klfj0M1HNDT')
          .then((result) => {
            console.log(result.text);  
          }, (error) => {
            console.log(error.text);
          });
      }

    return (
        <div className= 'signin'>
            <div className= 'signin_block'>
                <img src={Icon} alt=""/>
                <h1>Sign In to Snapshots</h1>
                <div className= 'username'>
                    <input placeholder= 'Username'/>
                </div>
                <div className= 'password'>
                    <input placeholder= 'Password'/>
                </div>
                <div className= 'forgot_password'>
                    <ul>
                        <li>
                            <Link to= '/forgot-password'>Forgot Password</Link>
                        </li>
                    </ul>
                </div>
                <div className= 'button'>
                    <Button /*component= {Link} to='/photolibrary'*/ variant="contained" size= 'large' onClick={togglePopup}>Sign In</Button>
                    {isOpen && <Popup
                        content={<>
                        <b>Sign In Error</b>
                        <p>We were unable to log you into your account. Please try again.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                <div className= 'multifactor_test'>
                    <form ref={form}>
                    </form>
                    <button onClick={sendEmail}>Test Multifactor Authentication</button>
                    <h3>Enter your given code in the box below:</h3>
                    <input placeholder='Enter Code Here'></input>
                    <Link to='/photolibrary'><button>Authenticate</button></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
