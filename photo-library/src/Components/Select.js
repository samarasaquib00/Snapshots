import React from 'react'
import SelectButton from './Select.css'
import PhotoLibrary from '../Pages/PhotoLibrary'

function Select() {


    function storePhoto() {
        //get mouse click
        //console.log("Hello");
        //add photo to a data structure to store it

    }


    return (
        <div className= 'select button'>
            <button class="SelectButton" onClick={storePhoto}>Select
            
            </button>     
        </div>
    )




}

export default Select