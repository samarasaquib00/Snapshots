import React from 'react'
import './AlbumHeader.css'
import Select from '../Components/Select';
import Sort from '../Components/Sort';
import Delete from '../Components/Delete';



function AlbumHeader() {
    return (
        <div className= 'album_header'>
            <div className= 'album_header_left'>
                <h1>Albums</h1>
            </div>
            <div className= 'album_header_right'>
                <Select />
                <Delete />
                <Sort />
            </div>
        </div>

    )
}

export default AlbumHeader