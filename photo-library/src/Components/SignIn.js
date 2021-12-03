import React, { useState, useRef } from 'react'
import './SignIn.css';
import Icon from '../Icon.png';
import Button from '@mui/material/Button';
import Popup from '../Components/Popup';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

function SignIn() {

    const axios = require('axios');

    const [isOpen, setIsOpen] = useState(false);
    const [authenticationBool, setAuthenticationBool] = useState(false);

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

    /*
    1. make a request to the server to send the username/pass to check if its valid
    2. store the username/pass in a cookie if valid


    */

    const authenticateInputs = () => {


        console.log(document.getElementById("user").value)
        let userString = document.getElementById("user").value
        let passString = document.getElementById("pass").value
        // store into a cookie

        /* stack overflow */
        var session_url = 'http://127.0.0.1:8183/api/photometadatalist';
        var uname = userString;
        var pass = passString;


        axios.get(session_url, {
            auth: {
                username: uname,
                password: pass
            }
        }).then(function (response) {
            document.cookie = `username=${userString}`
            document.cookie = `password=${passString}`
            console.log("all cookies: ", document.cookie)
            console.log('Authenticated');
            setAuthenticationBool(true);
            togglePopup();
            //<Link to='/photolibrary'><Button>Sign In</Button></Link>

        }).catch(function (error) {
            console.log('Error on Authentication');
            togglePopup();

        });
        /* stack overflow */






    }



    return (
        <div className='signin'>
            <div className='signin_block'>
                <img src={Icon} alt="" />
                <h1>Sign In to Snapshots</h1>
                <div className='username'>
                    <input id="user" type="text" placeholder='Username' />
                </div>
                <div className='password'>
                    <input id="pass" type="password" placeholder='Password' />
                </div>
                <div className='forgot_password'>
                    <ul>
                        <li>
                            <Link to='/forgot-password'>Forgot Password</Link>
                        </li>
                    </ul>
                </div>
                <Button /*component= {Link} to='/photolibrary'*/ variant="contained" size='large' onClick={authenticateInputs}>Sign In</Button>
                <div className='button'>
                    {isOpen && !authenticationBool && <Popup
                        content={<>
                            <b>Sign In Error</b>
                            <p>We were unable to log you into your account. Please try again.</p>
                            <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                    {isOpen && authenticationBool && <Popup
                        content={<>
                            <b>Sign In Successful</b>
                            <div></div>
                            <Link to='/photolibrary'><button onClick={togglePopup}>OK</button></Link>
                        </>}
                        handleClose={togglePopup}
                    />}


                    <div className='multifactor_test'>
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
