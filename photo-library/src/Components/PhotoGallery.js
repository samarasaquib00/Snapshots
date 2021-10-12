import React, { useState } from 'react'
import { Images } from './PhotoData'

const PhotoGallery = () => {
    const [imageList, setImageList] = useState(Images);
    return (
        <div className= 'imageGrid'>
            {imageList.map((item) => <img src={item.url}></img>) }
        </div>
    )
}

export default PhotoGallery
