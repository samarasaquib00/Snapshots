import React, { useState, useEffect, useCallback } from 'react'
import './ViewAlbum.css'
import { Link, useLocation } from 'react-router-dom'

const axios = require('axios');


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


function ViewAlbum() {

    const { location, query } = useLocation();
    const [imageArray, setImageArray] = useState([])
    const [currentId, setCurrentId] = useState(null);
    const [photoObject, setPhotoObject] = useState(null);

    useEffect(() => {

        var username_cookie = getCookie("username")
        var password_cookie = getCookie("password")

        axios.get('http://127.0.0.1:8183/api/albumphoto?album_id=' + query,  
        { auth: { username: username_cookie, password: password_cookie} }).then(res => {
            let data = res.data;
            let photoIdArray = [];
            console.log(data.albumphotos);
            if (data.albumphotos !== undefined) {
                for (const element of data.albumphotos) {
                    photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element, photoInfo: element });
                }
                setImageArray(photoIdArray);
            }
        })
    }, []);

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

    const deletePhoto = () => {
        var username_cookie = getCookie("username")
        var password_cookie = getCookie("password")
        
        axios.delete('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId,
        { auth: { username: username_cookie, password: password_cookie} }).then(res => {
            let data = res.data;
            console.log(data);
        })
    }

    return (
        <div className='view_album_page'>
            <div className='view_header'>
                <div className='view_header_left'>
                    <h1>View Album Photos</h1>
                </div>
                <div className='view_header_right'>
                    <Link to={{
                        pathname: '/addtoalbum',
                        query: query
                    }}>
                        <button className='add_photos_button'>Add Photos</button>
                    </Link>
                    <Link to={{
                        pathname: '/albums',
                        query: query
                    }}>
                        <button className='delete_photos_button' onClick={deletePhoto}>Delete Photos</button>
                    </Link>
                </div>
            </div>
            <div className='album_photos'>
                {imageArray.map((imageElement, index) => {
                    let customAttr = { 'data-photo_id': imageElement.photoInfo }
                    return (
                        <img key={index} src={imageElement.photoUrl} alt="" {...customAttr} id={imageElement.photoInfo} onClick={imageClick} />
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ViewAlbum
