import React from 'react'
import './ForgotPassword.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className= 'forgot_page'>
            <h1>Forgot Password Page</h1>

            <div className= 'email_instructions'>
                <p>To recover your password, enter your email address and follow the instructions in the email you receive to change your password.</p>
            </div>
            <div className= 'forgot_email'>
                <input placeholder= 'Email Address'/>
            </div>
            <Button component={Link} to='/login' variant="outlined" size="medium">
            Send Email
            </Button>
        </div>
    )
}

export default ForgotPassword
