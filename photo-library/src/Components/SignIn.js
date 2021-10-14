import React from 'react'
import './SignIn.css';
import Icon from '../Icon.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function SignIn() {
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
                    <Button component= {Link} to='/photolibrary' variant="contained" size= 'large'>Sign In</Button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
