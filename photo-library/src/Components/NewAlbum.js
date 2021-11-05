import React, {useState} from 'react'
import './NewAlbum.css';
import Popup from './Popup';

function NewAlbum() {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className='new_album'>
            <button onClick={togglePopup} className='new_album_button'>Add</button>
            {isOpen && <Popup
                        content={<>
                        <b>Create a New Album</b>
                        <form>
                        <input placeholder='Album Name'></input>
                        <p>There are no photos for you to add to this album</p>
                        <button onClick={togglePopup}>Create Album</button>
                        </form>
                        </>}
                        handleClose={togglePopup}
            />}

        </div>
    )
}

export default NewAlbum
