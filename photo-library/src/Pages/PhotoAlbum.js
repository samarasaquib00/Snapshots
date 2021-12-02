import React, {useState, useEffect, useCallback} from 'react'
import './PhotoAlbum.css'
import AlbumHeader from '../Components/AlbumHeader'
import AlbumIcon from '../test-images/folder.png'
import { Link } from 'react-router-dom';

const axios = require('axios');

function PhotoAlbum() {

    const [albumArray, setAlbumArray] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/albumlist').then(res => {
          let data = res.data;
          console.log(data);
          let albumIdArray = [];
          if(data.result !== undefined) {
          for (const element of data.result) {
            albumIdArray.push({ albumUrl: 'http://127.0.0.1:8183/api/album/' + element.album_id, album_id: element.album_id, name: element.name});
            }
          }
          console.log(albumIdArray);
          setAlbumArray(albumIdArray);
        })
      }, []);

    return (
        <div className= 'page'>
            <div className= 'photoAlbum'>
                <AlbumHeader />
            </div>

            <div className= 'album_gallery'> 
                {albumArray.map((albumElement, index) => {
                    let customAttr = { 'data-photo_id': albumElement.album_id }
                    return(
                    <Link to={{
                        pathname: '/viewalbum',
                        query: albumElement.album_id
                    }}>
                        <div className='album_images'>
                            <img key={index} src={AlbumIcon} title={albumElement.name} alt=""/>
                            <h3><span>{albumElement.name}</span></h3>
                        </div>
                    </Link>
                    )}
                )}
            </div>
        </div>
    )
}

export default PhotoAlbum