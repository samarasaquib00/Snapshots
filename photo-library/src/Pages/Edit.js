import React from 'react'
import './Edit.css'
import Crop from '../Components/CropButton'
import Exposure from '../Components/ExposureButton'
import SaveExit from '../Components/SaveExitButton'


function Edit() {
    return (
        <div className='edit_page'>
            <h1>Edit Photo Page</h1>
            <div className='edit'>
                <h1>Click on edit options to edit photo</h1>
                <Crop />
                <Exposure />
                <SaveExit />

            </div>

        </div>
    )
}

export default Edit
