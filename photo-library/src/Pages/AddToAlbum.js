import React, {useState, useEffect, useCallback} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './AddToAlbum.css'

const axios = require('axios');

export default function AddToAlbum() {
    const {location, query} = useLocation();
    const [imageArray, setImageArray] = useState([])
    const [currentId, setCurrentId] = useState(null);
    const [photoObject, setPhotoObject] = useState(null);


    /* Get the cookies */
    function getCookie(c_name) {
        var c_value = " " + document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }


    useEffect(() => {
        var username_cookie = getCookie("username")
        var password_cookie = getCookie("password")
        
        axios.get('http://127.0.0.1:8183/api/photometadatalist', 
        { auth: { username: username_cookie, password: password_cookie} }).then(res => {
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
            var username_cookie = getCookie("username")
            var password_cookie = getCookie("password")

            event.preventDefault();
            const currentId = event.target.getAttribute("id");
            setCurrentId(currentId)
            setPhotoObject(event.target.src);
            if (event.target.border == "0 px solid blue") {
                event.target.border = "3 px solid blue";
                axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId, null, 
                { auth: { username: username_cookie, password: password_cookie} }).then(res => {
                    let data = res.data;
                    console.log(data);
                  })
            } else { /* Deselect */
                //does not remove id from array
                event.target.border = "0 px solid blue";
                axios.delete('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId,
                { auth: { username: username_cookie, password: password_cookie} }).then(res => {
                    let data = res.data;
                    console.log(data);
                  })
            /* End Select */
            }
        }, []
      );

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
                    <button className='add_photos_to_album_button'>Add Selected</button>
                </div>
            </Link>
        </div>
    )
}
