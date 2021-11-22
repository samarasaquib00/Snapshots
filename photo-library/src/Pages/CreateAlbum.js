import React, {useState, useEffect} from 'react'
import './CreateAlbum.css';
import { Link } from 'react-router-dom';

const axios = require('axios');

function CreateAlbum() {

    const [imageArray, setImageArray] = useState([])
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/photometadatalist/').then(res => {
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
    }

    return (
        <div className='new_album_page'>
            <h1>Create Album Page</h1>
            <b>Create a New Album</b>
            <form>
                <input placeholder='Album Name' onChange={e => setName(e.target.value)}></input>
                <div className='images'>
                {imageArray.map((imageElement, index) => 
                    <img key={index} src={imageElement.photoUrl} alt="" />
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
