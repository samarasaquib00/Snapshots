import React, {useState, useEffect, useCallback} from 'react'
import './PhotoAlbum.css'
import AlbumHeader from '../Components/AlbumHeader'
import AlbumIcon from '../test-images/folder.png'
import Popup from '../Components/Popup'
import { Link } from 'react-router-dom';

const axios = require('axios');

function PhotoAlbum() {

    const [albumArray, setAlbumArray] = useState([])
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [currentId, setCurrentId] = useState(null);
    const [photoObject, setPhotoObject] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/albumlist').then(res => {
          let data = res.data;
          console.log(data);
          let albumIdArray = [];
          for (const element of data.result) {
            albumIdArray.push({ albumUrl: 'http://127.0.0.1:8183/api/album/' + element.album_id, album_id: element.album_id, name: element.name });
        }
          console.log(albumIdArray);
          setAlbumArray(albumIdArray);
        })
      }, []);

      const handleAlbumClick = useCallback(
        (event) => {
          event.preventDefault();
          const currentId = event.target.getAttribute("id");
          setCurrentId(currentId)
          setPhotoObject(event.target.src);
          setAnchorPoint({ x: event.pageX, y: event.pageY });
        },
        [setAnchorPoint]
      );

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
                {albumArray.map((albumElement, index) => 
                    <Link>
                        <div className='album_images'>
                            <img key={index} src={AlbumIcon} title={albumElement.name} alt="" />
                            <h3><span>{albumElement.name}</span></h3>
                        </div>
                    </Link>
                )}
  
            {/* 
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
            */}
            </div>
        </div>
    )
}

export default PhotoAlbum