import React, { useState } from 'react'
import './PhotoLibrary.css'
import LibraryHeader from '../Components/LibraryHeader';
import PhotoGallery from '../Components/PhotoGallery';
import Photo from '../test-images/img1.jpg'
import Photo2 from '../test-images/img2.jpg'
import Photo3 from '../test-images/img3.jpg'
import Photo4 from '../test-images/img4.jpg'



function PhotoLibrary() {


    //onclick on images
    const [select, setSelect] = useState(false)

    //append to this list
    const [selected, setSelected] = useState([])

    const selection = () => { 
        //unselect or select
        setSelect(!select)
        
    }


    const imageClick = (e) => {
        
        console.log(e.target.attributes);
        //if (select == true) {
            e.target.border = "3 px solid black";
            //setSelect(select.push(e.target))
        //}
        
      } 
      
      //delete function and delete method


    return (

        <div className= 'page'>
            <div className= 'photolibrary'>
                <LibraryHeader />
            </div>
            <div className= 'gallery'>
                <img onClick={imageClick} className='sample_photo1' src={Photo} alt="" />
                <img onClick={imageClick} className='sample_photo2' src={Photo2} alt="" />
                <img onClick={imageClick} className='sample_photo3' src={Photo3} alt="" />
                <img onClick={imageClick} className='sample_photo4' src={Photo4} alt="" />
                


            </div>
            <div className= 'bottom_buttons'>
                {/* put delete, share, and select buttons in this container and fix css */
                /* Just put the buttons here, functionality is in Components */
                /* When select button is clicked, make it so that the photos you click on are highlighted */
                /* When the delete button is clicked, change visibility of photo and try to change sorting */

                }
            </div>
        </div>
    )
}

export default PhotoLibrary