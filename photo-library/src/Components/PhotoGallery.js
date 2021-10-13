import React, { useState } from 'react'
import { Images } from './PhotoData'

const PhotoGallery = () => {
    <>
    {
        Images.map((photo, index) => {
            return (<div
                key ={index}
                style={{
                    overflowY: "scroll",
                    height: 5000,
                    width: "100%",
                    backgroundImage: `url(${photo})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"}}>   
            </div>)
        })
    }
    </>
}

export default PhotoGallery
