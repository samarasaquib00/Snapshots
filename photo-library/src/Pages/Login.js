import React from 'react'
import './Login.css';
import SignIn from '../Components/SignIn';

function Login() {
    return (
        <div className= 'login'>
            <h1>Login Page</h1>
            <div className= 'blocks'>
                <div className= 'sign_in'>
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default Login