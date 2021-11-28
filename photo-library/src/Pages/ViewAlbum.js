import React, {useState, useEffect} from 'react'
import './ViewAlbum.css'
import { Link, useLocation } from 'react-router-dom'

const axios = require('axios');

function ViewAlbum() {

    const {location, query} = useLocation();
    const [imageArray, setImageArray] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/albumphoto?album_id=' + query).then(res => {
          let data = res.data;
          let photoIdArray = [];
          for (const element of data.albumphotos) {
            photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element});
          }
          setImageArray(photoIdArray);
        })
    }, []);


    return (
        <div className='view_album_page'>
            <div className='view_header'>
                <div className='view_header_left'>
                    <h1>View Album Photos</h1>
                </div>
                <div className='view_header_right'>
                    <Link to={{pathname: '/addtoalbum',
                        query: query}}>
                        <button className='add_photos_button'>Add Photos</button>
                    </Link>
                    <button className='delete_photos_button'>Delete Photos</button>
                </div>
            </div>
            <div className='album_photos'>
                {imageArray.map((imageElement, index) => {
                    return (
                    <img key={index} src={imageElement.photoUrl} alt=""/>
                    )}
                )}
            </div>
        </div>
    )
}

export default ViewAlbum
