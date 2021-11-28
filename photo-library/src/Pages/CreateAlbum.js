import React, {useState, useEffect, useCallback} from 'react'
import './CreateAlbum.css';
import { Link } from 'react-router-dom';

const axios = require('axios');

function CreateAlbum() {

    const [imageArray, setImageArray] = useState([])
    const [name, setName] = useState('');
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

    async function createAlbum() {
        console.log(name);
        let res = await axios.post('http://127.0.0.1:8183/api/album?name=' + name + '&owner=1')
        let data = res.data;
        console.log(data);
        //get album by name not id
    }

    const imageClick = useCallback(
        (event) => {
            event.preventDefault();
            const currentId = event.target.getAttribute("id");
            setCurrentId(currentId)
            setPhotoObject(event.target.src);
            if (event.target.border == "0 px solid black") {
                event.target.border = "3 px solid black";
                setSelected(selected.push(currentId))
            } else { /* Deselect */
                //does not remove id from array
                event.target.border = "0 px solid black";
                const id = event.target.getAttribute("id");
                setSelected(selected.filter(pic=>pic.id!=id));
            /* End Select */
            }
            console.log(currentId);
            console.log(selected);
            },
        []
      );

    return (
        <div className='new_album_page'>
            <h1>Create Album Page</h1>
            <b>Create a New Album</b>
            <form>
                <input placeholder='Album Name' onChange={e => setName(e.target.value)}></input>
                <div className='images'>
                {imageArray.map((imageElement, index) => {
                    let customAttr = { 'data-photo_id': imageElement.photoInfo.photo_id }
                    return (
                    <img key={index} src={imageElement.photoUrl} alt="" {...customAttr} id={imageElement.photoInfo.photo_id} onClick={imageClick}/>
                    )}
                )}
                </div>
                <Link to='albums'>
                    <div className='create_button'>
                        <button onClick={createAlbum}>Create Album</button>
                    </div>
                </Link>
            </form>
        </div>
    )
}

export default CreateAlbum
