import React, {useState, useEffect, useCallback} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './AddToAlbum.css'

const axios = require('axios');

export default function AddToAlbum() {
    const {location, query} = useLocation();
    const [imageArray, setImageArray] = useState([])
    const [currentId, setCurrentId] = useState(null);
    const [photoObject, setPhotoObject] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/photometadatalist').then(res => {
          let data = res.data;
          let photoIdArray = [];
          for (const element of data.result) {
            photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element.photo_id, photoInfo: element });
          }
          setImageArray(photoIdArray);
        })
      }, []);

    const imageClick = useCallback(
        (event) => {
            event.preventDefault();
            const currentId = event.target.getAttribute("id");
            setCurrentId(currentId)
            setPhotoObject(event.target.src);
            if (event.target.border == "0 px solid blue") {
                event.target.border = "3 px solid blue";
                axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId).then(res => {
                    let data = res.data;
                    console.log(data);
                  })
            } else { /* Deselect */
                //does not remove id from array
                event.target.border = "0 px solid blue";
                axios.delete('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId).then(res => {
                    let data = res.data;
                    console.log(data);
                  })
            /* End Select */
            }
        }, []
      );

    const sendMessage = () => {
        alert("Album successfully edited");
    }

    return (
        <div className='add_photos_page'>
            <div className='add_photos_header'>
                <h1>Add Photos To Album</h1>
            </div>
            <div className='images'>
                {imageArray.map((imageElement, index) => {
                    let customAttr = { 'data-photo_id': imageElement.photoInfo.photo_id }
                    return (
                    <img key={index} src={imageElement.photoUrl} alt="" {...customAttr} id={imageElement.photoInfo.photo_id} onClick={imageClick}/>
                    )}
                )}
            </div>
            <Link to='albums'>
                <div className='button_container'>
                    <button className='add_photos_to_album_button' onClick={sendMessage}>Add Selected</button>
                </div>
            </Link>
        </div>
    )
}
