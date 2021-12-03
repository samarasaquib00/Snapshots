import React, {useState, useEffect, useCallback} from 'react'
import './CreateAlbum.css';
import { Link } from 'react-router-dom';

const axios = require('axios');

function CreateAlbum() {

    const [name, setName] = useState('');


    /* Get the cookies */
    function getCookie(c_name) {
        var c_value = " " + document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    async function createAlbum() {
        var username_cookie = getCookie("username")
        var password_cookie = getCookie("password")

        console.log(name);
        let res = await axios.post('http://127.0.0.1:8183/api/album?name=' + name + '&owner=1', null, 
        { auth: { username: username_cookie, password: password_cookie} })
        let data = res.data;
        console.log(data);
    }

    return (
        <div className='new_album_page'>
            <h1>Create Album Page</h1>
            <b>Create a New Album</b>
            <form>
                <input placeholder='Album Name' onChange={e => setName(e.target.value)}></input>
                <Link to='albums'>
                    <div className='create_button_container'>
                        <button className='create_button' onClick={createAlbum}>Create Album</button>
                    </div>
                </Link>
            </form>
        </div>
    )
}

export default CreateAlbum
