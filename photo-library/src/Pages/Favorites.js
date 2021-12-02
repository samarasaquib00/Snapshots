import React, {useEffect, useState, useCallback} from 'react'
import './Favorites.css'
import { Link } from 'react-router-dom'

const axios = require('axios');

function Favorites() {
    const [imageArray, setImageArray] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [photoObject, setPhotoObject] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/photometadatalist?favorite=true').then(res => {
          let data = res.data;
          console.log(data)
          let photoIdArray = [];
          for (const element of data.result) {
            photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element.photo_id, photoInfo: element });
          }
          setImageArray(photoIdArray);
        })
        console.log("running useEffect")
      }, []);

    async function deleteFavorite() {
        axios.post('http://127.0.0.1:8183/api/tempfavoriteupdate/' + currentId + '?is_favorite=false').then(res => {
            let data = res.data;
            console.log(data);
        })
    }

    const imageClick = useCallback(
        (event) => {
            event.preventDefault();
            const currentId = event.target.getAttribute("id");
            setPhotoObject(event.target.src);
            if (event.target.border == "0 px solid blue") {
                event.target.border = "3 px solid blue";
                setCurrentId(currentId);
                console.log(currentId);
            } else { /* Deselect */
                event.target.border = "0 px solid blue";
            /* End Select */
            }
    }, []);
      
    return (
        <div className='favorites_page'>
            <div className='favorites_header'>
                <div className='favorites_header_left'>
                    <h1>Favorites Page</h1>
                </div>
                <div className='favorites_header_right'>
                    <Link to='/photolibrary'>
                        <button className='favorite_delete' onClick={deleteFavorite}>Remove From Favorites</button>
                    </Link>
                </div>
            </div>
            <div className='images'>
                {imageArray.map((imageElement, index) => {
                    let customAttr = { 'data-photo_id': imageElement.photoInfo.photo_id }
                    return(
                    <div>
                    <img onClick={imageClick} src={imageElement.photoUrl} key={index} {...customAttr} id={imageElement.photoInfo.photo_id}/>
                    </div>
                    )}
                 )}
            </div>
        </div>
    )
}

export default Favorites
