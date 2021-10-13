import React from 'react'
import './SignIn.css';
import Icon from '../Icon.png'

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
            </div>
        </div>
    )
}

export default SignIn
