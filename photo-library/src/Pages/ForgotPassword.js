import React, { useRef } from 'react'
import './ForgotPassword.css'
import Button from '@mui/material/Button';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
  
        emailjs.sendForm('gmail', 'template_94il464', form.current, 'user_KT30rvnEd5klfj0M1HNDT')
          .then((result) => {
            console.log(result.text);  
          }, (error) => {
            console.log(error.text);
          });
      }

    return (
        <div className= 'forgot_page'>
            <h1>Forgot Password Page</h1>

            <div className= 'email_instructions'>
                <p>To recover your password, enter your email address and follow the instructions in the email you receive to change your password.</p>
            </div>
            <form ref={form}>
                <div className= 'forgot_email'>
                    <input type='email' name='user_email' placeholder= 'Email Address'/>
                </div>
                <div className='send_email_button' onClick={sendEmail}>
                    <Button component={Link} to='/login' variant="outlined" size="medium">
                    Send Email
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
