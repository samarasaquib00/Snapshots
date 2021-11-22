import React, {useState} from 'react'
import './NewAlbum.css';
import { Link } from 'react-router-dom';

function NewAlbum() {
    return (
        <div className='new_album'>
            <Link to='/createalbum'>
                <button className='new_album_button'>Add</button>
            </Link>
        </div>
    )
}

export default NewAlbum
