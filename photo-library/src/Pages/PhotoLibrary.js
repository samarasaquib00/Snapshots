import React from 'react'
import './PhotoLibrary.css'
import LibraryHeader from '../Components/LibraryHeader';
import PhotoGallery from '../Components/PhotoGallery';
import Photo from '../test-images/img1.jpg'
import Photo2 from '../test-images/img2.jpg'
import Photo3 from '../test-images/img3.jpg'
import Photo4 from '../test-images/img4.jpg'

function PhotoLibrary() {
    return (
        <div className= 'page'>
            <div className= 'photolibrary'>
                <LibraryHeader />
            </div>
            <div className= 'gallery'>
                <img className='sample_photo1' src={Photo} alt="" />
                <img className='sample_photo2' src={Photo2} alt="" />
                <img className='sample_photo3' src={Photo3} alt="" />
                <img className='sample_photo4' src={Photo4} alt="" />
            </div>
            <div className= 'bottom_buttons'>
                {/* put delete, share, and select buttons in this container and fix css */}
            </div>
        </div>
    )
}

export default PhotoLibrary