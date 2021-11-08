import React, { Component, useState } from 'react'
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
import ContextMenu from '../Components/ContextMenu'

// Create Array of Images
//let imageArray = [Photo, Photo2, Photo3, Photo4, Photo6, Photo7, Photo8, Photo9, Photo10, 
  //  Photo11, Photo12, Photo13, Photo14, Photo15, Photo16]


function PhotoLibrary() {

    //make imagearray into state
    const [imageArray, setImageArray] = useState([
        {
            
            id: 0,
            image: Photo
        },
        {
            id: 1,
            image: Photo2
        },
        {
            id: 2,
            image: Photo3
        },
        {
            id: 3,
            image: Photo4
        },
        {
            id: 4,
            image: Photo5
        },
        {
            id: 5,
            image: Photo6
        },
        {
            id: 6,
            image: Photo7
        },
        {
            id: 7,
            image: Photo8
        },
        {
            id: 8,
            image: Photo9
        },
        {
            id: 9,
            image: Photo10
        },
        {
            id: 10,
            image: Photo11
        },
        {
            id: 11,
            image: Photo12
        },
        {
            id: 12,
            image: Photo13
        },
        {
            id: 13,
            image: Photo14
        },
        {
            id: 14,
            image: Photo15
        },
        {
            id: 15,
            image: Photo16
        }
    ])



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
      
    const handleDeleteImage = (i) => {
        //console.log(e.target.getAttribute("id"))
        //const i = e.target.getAttribute("id");
        const copyArray = JSON.parse(JSON.stringify(imageArray));
        console.log("i: ", i);
        console.log('filterdArray: ', copyArray.filter(image => {
            console.log('current I: ', i);
            console.log("image id: ", image.id);
            return String(image.id) !== i
        }))
        setImageArray(imageArray => imageArray.filter((imageFile,idx) => String(idx) !== i) );
        
    }

    console.log('image array: ', imageArray);

    return (

        <div className= 'page'>
            <div className= 'photolibrary'>
                <LibraryHeader />
            </div>
            <ContextMenu handleDeleteImage={handleDeleteImage} imageArray={imageArray} first="Edit" second="Delete" third="View Photo Metadata" fourth="Make Public" fifth="Share to Social Media"/>
            <div className= 'gallery'>

                {/* Display the photos in the array */}
                {imageArray.map((imageElement, index) => <img onClick={imageClick} src={imageElement.image} id={index} key={index}/> )
                }

            

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
