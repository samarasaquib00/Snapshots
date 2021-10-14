import React from 'react'
import './SignUp.css'
import Icon from '../Icon.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function SignUp() {
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
                    <Button component= {Link} to='/photolibrary' variant="contained" size= 'large'>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
