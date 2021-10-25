import React, { useState } from 'react'
import './PhotoLibrary.css'
import LibraryHeader from '../Components/LibraryHeader';
import PhotoGallery from '../Components/PhotoGallery';
import Photo from '../test-images/img1.jpg'
import Photo2 from '../test-images/img2.jpg'
import Photo3 from '../test-images/img3.jpg'
import Photo4 from '../test-images/img4.jpg'
import Photo5 from '../test-images/img5.jpg'
import Photo6 from '../test-images/img6.jpg'
import Photo7 from '../test-images/img7.jpg'
import Photo8 from '../test-images/img8.jpg'
import Photo9 from '../test-images/img9.jpg'
import Photo10 from '../test-images/img10.jpg'
import Photo11 from '../test-images/img11.jpg'
import Photo12 from '../test-images/img12.jpg'
import Photo13 from '../test-images/img13.jpg'
import Photo14 from '../test-images/img14.jpg'
import Photo15 from '../test-images/img15.jpg'
import Photo16 from '../test-images/img16.jpg'



function PhotoLibrary() {



    //onclick on images
    const [select, setSelect] = useState(false)

    //append to this list
    const [selected, setSelected] = useState([])

    const selection = () => { 
        //unselect or select
        setSelect(!select)

    }


    /* Detect photo mouse click */
    const imageClick = (e) => {
        
        console.log(e.target.attributes);
        //if (select == true) {
            //setSelect(select.push(e.target))
        //}
        /* Select */
        if (e.target.border=="0 px solid black") {
            e.target.border = "3 px solid black";
            //setSelected(selected.push(e.target))
        } else { /* Deselect */
            e.target.border = "0 px solid black";
            const name = e.target.getAttribute("name");
            //setSelected(selected.filter(pic=>pic.name!=name));
        }
        console.log(selected);
        
      } 
      
      //delete function and delete method

      /* RIGHT CLICK DETECTION */
      


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
                <img onClick={imageClick} className='sample_photo5' src={Photo5} alt="" />
                <img onClick={imageClick} className='sample_photo6' src={Photo6} alt="" />
                <img onClick={imageClick} className='sample_photo7' src={Photo7} alt="" />
                <img onClick={imageClick} className='sample_photo8' src={Photo8} alt="" />
                <img onClick={imageClick} className='sample_photo9' src={Photo9} alt="" />
                <img onClick={imageClick} className='sample_photo10' src={Photo10} alt="" />
                <img onClick={imageClick} className='sample_photo11' src={Photo11} alt="" />
                <img onClick={imageClick} className='sample_photo12' src={Photo12} alt="" />
                <img onClick={imageClick} className='sample_photo13' src={Photo13} alt="" />
                <img onClick={imageClick} className='sample_photo14' src={Photo14} alt="" />
                <img onClick={imageClick} className='sample_photo15' src={Photo15} alt="" />
                <img onClick={imageClick} className='sample_photo16' src={Photo16} alt="" />
                


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
