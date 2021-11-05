import React, {useState} from 'react'
import './PhotoAlbum.css'
import AlbumHeader from '../Components/AlbumHeader'
import AlbumIcon from '../test-images/folder.png'
import Popup from '../Components/Popup'

function PhotoAlbum() {

    //onclick on images
    const [select, setSelect] = useState(false)

    //append to this list
    const [selected, setSelected] = useState([])

    const selection = () => { 
        //unselect or select
        setSelect(!select)
    }

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const imageClick = (e) => {

        
        console.log(e.target.attributes);
        if (e.target.border=="0 px solid black") {
            e.target.border = "3 px solid black";
            //setSelected(selected.push(e.target))
        } else { /* Deselect */
            e.target.border = "0 px solid black";
            const name = e.target.getAttribute("name");
            //setSelected(selected.filter(pic=>pic.name!=name));
        }
        
    } 

    return (
        <div className= 'page'>
            <div className= 'photoAlbum'>
                <AlbumHeader />
            </div>

            <div className= 'album_gallery'>     
                <div class='album_image'>
                    <img onClick={togglePopup} className='sample_album1' src={AlbumIcon} alt="" />
                    <h3><span>Album 1</span></h3>
                    {isOpen && <Popup
                        content={<>
                        <b>Album Error</b>
                        <p>This album is empty and cannot be displayed.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>               

                <div class='album_image'>
                    <img onClick={togglePopup} className='sample_album2' src={AlbumIcon} alt="" />
                    <h3><span>Album 2</span></h3>
                    {isOpen && <Popup
                        content={<>
                        <b>Album Error</b>
                        <p>This album is empty and cannot be displayed.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>

                <div class='album_image'>
                    <img onClick={togglePopup} className='sample_album3' src={AlbumIcon} alt="" />                    
                    <h3><span>Album 3</span></h3>
                    {isOpen && <Popup
                        content={<>
                        <b>Album Error</b>
                        <p>This album is empty and cannot be displayed.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>

                <div class='album_image'>
                    <img onClick={togglePopup} className='sample_album4' src={AlbumIcon} alt="" />
                    <h3><span>Album 4</span></h3>
                    {isOpen && <Popup
                        content={<>
                        <b>Album Error</b>
                        <p>This album is empty and cannot be displayed.</p>
                        <button onClick={togglePopup}>OK</button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>
            </div>
        </div>
    )
}

export default PhotoAlbum