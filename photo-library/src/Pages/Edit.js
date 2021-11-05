import React from 'react'
import './Edit.css'
import Crop from '../Components/CropButton'
import Exposure from '../Components/ExposureButton'
import SaveExit from '../Components/SaveExitButton'
import Filter from '../Components/FilterButton'
import { useLocation } from 'react-router-dom'


function Edit() {
    const {location, query} = useLocation()
    //const { target } = location.state
    console.log(query)
    return (
        <div className='edit_page'>
            <div className='edit_page_header' >
                <h1>Edit Photo Page</h1>
                <SaveExit />
            </div>
            <div className='edit'>
                <p>Click on edit options to edit photo</p>
                <img src={query.targetsrc} />
                <Crop />
                <Exposure />
                <Filter />

            </div>

        </div>
    )
}

export default Edit
