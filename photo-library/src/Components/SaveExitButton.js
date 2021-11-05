import React from 'react'
import SaveExitButton from './SaveExitButton.css'
import { Link } from 'react-router-dom';


function SaveExit() {
    return (
        <div className= 'crop button'>
            <Link to ='/photolibrary'>
                <button class="SaveExitButton">Save and Exit</button>
            </Link>
        

        </div>
    )
}

export default SaveExit
