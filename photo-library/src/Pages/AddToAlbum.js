import React, {useState, useEffect, useCallback, forEach} from 'react'
import { Link, useLocation } from 'react-router-dom'

const axios = require('axios');

export default function AddToAlbum() {
    const {location, query} = useLocation();
    const [imageArray, setImageArray] = useState([])
    const [selected, setSelected] = useState([]);
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
                setSelected(selected.push(currentId))
                axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + currentId).then(res => {
                    let data = res.data;
                    console.log(data);
                  })
            } else { /* Deselect */
                //does not remove id from array
                event.target.border = "0 px solid blue";
                const images = selected.filter(id => id !== currentId);
                console.log(images);
                setSelected(images);
            /* End Select */
            }
            console.log(currentId);
            console.log(selected);
        }, []
      );

      {/*
      async function addToAlbum() {
          console.log("calling add to album")

          let idArray = selected.map((id) =>
          axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + id).then(res => {
            let data = res.data;
            console.log(data);
          })
        );

            selected.forEach(postRequest);
          let idArray = [selected];
          console.log(idArray);
          for(const element of idArray) {
            axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + element).then(res => {
                let data = res.data;
                console.log(data);
            })
          }
      }

      function postRequest(id, index, array) {
        axios.post('http://127.0.0.1:8183/api/albumphoto?album_id=' + query + '&photo_id=' + id).then(res => {
            let data = res.data;
            console.log(data);
        })
      }

    */}

    return (
        <div>
            <h1>Add Photos To Album</h1>
            <div className='images'>
                {imageArray.map((imageElement, index) => {
                    let customAttr = { 'data-photo_id': imageElement.photoInfo.photo_id }
                    return (
                    <img key={index} src={imageElement.photoUrl} alt="" {...customAttr} id={imageElement.photoInfo.photo_id} onClick={imageClick}/>
                    )}
                )}
            </div>
            <Link to='albums'>
                <div className='add_photos_to_album_button'>
                    <button //onClick={addToAlbum}
                    >Add Selected</button>
                </div>
            </Link>
        </div>
    )
}
