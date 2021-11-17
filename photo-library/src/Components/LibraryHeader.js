import React from 'react'
import './LibraryHeader.css'
import Sort from '../Components/Sort';



function LibraryHeader() {
    return (
        <div className= 'library_header'>
            <div className= 'library_header_left'>
                <h1>Photo Library</h1>
            </div>
            <div className= 'library_header_right'>
                {/* sort button goes here, css needs to be fixed */}
                <Sort />
            </div>
        </div>

    )
}

export default LibraryHeader
