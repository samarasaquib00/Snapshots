import React from 'react'
import './Login.css';
import SignIn from '../Components/SignIn';

function Login() {
    return (
        <div className= 'login'>
            <h1>Login Page</h1>
            <div className= 'sign_in'>
                <SignIn />
            </div>
            <div className= 'sign_up'>

            </div>
        </div>
    )
}

export default Login