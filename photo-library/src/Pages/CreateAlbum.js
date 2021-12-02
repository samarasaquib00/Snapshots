import React, {useState, useEffect, useCallback} from 'react'
import './CreateAlbum.css';
import { Link } from 'react-router-dom';

const axios = require('axios');

function CreateAlbum() {

    const [name, setName] = useState('');

    async function createAlbum() {
        console.log(name);
        let res = await axios.post('http://127.0.0.1:8183/api/album?name=' + name + '&owner=1')
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
