import React from 'react'
import './AlbumHeader.css'
import Sort from '../Components/Sort';
import Delete from '../Components/Delete';
import Add from './NewAlbum';


function AlbumHeader() {
    return (
        <div className= 'album_page'>
            <div className= 'album_header'>
                <div className= 'album_header_left'>
                    <h1>Album Library</h1>
                </div>
                <div className= 'album_header_right'>
                    <Add />
                </div>
            </div>
        </div>
    )
}

export default AlbumHeader