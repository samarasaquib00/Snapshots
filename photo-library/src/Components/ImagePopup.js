import React from 'react'
import './Popup.css'

const Popup = props => {
    return (
        <div className='popup_container'>
            <div className='popup_image_box'>
                <span className='image_close_icon' onClick={props.handleClose}>x</span>
                {props.content}
            </div>           
        </div>
    )
}

export default Popup
