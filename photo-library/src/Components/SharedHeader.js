import React from 'react'
import './SharedHeader.css'
import Select from '../Components/Select';
import Sort from '../Components/Sort';
import Delete from '../Components/Delete';



function SharedHeader() {
    return (
        <div className= 'shared_header'>
            <div className= 'shared_header_left'>
                <h1>Shared Library</h1>
            </div>
            <div className= 'shared_header_right'>
                <Select />
                <Delete />
                <Sort />
            </div>
        </div>

    )
}

export default SharedHeader