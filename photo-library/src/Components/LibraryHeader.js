import React from 'react'
import './LibraryHeader.css'

function LibraryHeader() {
    return (
        <div className= 'library_header'>
            <div className= 'library_header_left'>
                <h1>Photo Library</h1>
            </div>
            <div className= 'library_header_right'>
                {/* sort button goes here, css needs to be fixed */}
                <h2>Sort Button</h2>
            </div>
        </div>

    )
}

export default LibraryHeader
