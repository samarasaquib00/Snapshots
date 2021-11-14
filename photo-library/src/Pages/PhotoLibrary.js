import React, { useEffect, useState, useCallback } from 'react'
import './PhotoLibrary.css'
import LibraryHeader from '../Components/LibraryHeader';
import { Link } from 'react-router-dom';

// Create Array of Images
//let imageArray = [Photo, Photo2, Photo3, Photo4, Photo6, Photo7, Photo8, Photo9, Photo10, 
//  Photo11, Photo12, Photo13, Photo14, Photo15, Photo16]

const axios = require('axios');

function PhotoLibrary() {

  //make imagearray into state
  const [imageArray, setImageArray] = useState([])



  //onclick on images
  const [select, setSelect] = useState(false)

  //append to this list
  const [selected, setSelected] = useState([])


  const selection = () => {
    //unselect or select
    setSelect(!select)

  }

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [currentId, setCurrentId] = useState(null);
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      const currentId = event.target.getAttribute("id");
      setCurrentId(currentId)
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8183/api/photometadatalist/').then(res => {
      let data = res.data;
      let photoIdArray = [];
      for (const element of data.result) {
        photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element.photo_id, photoInfo: element });
      }
      setImageArray(photoIdArray);
    })
  }, [imageArray]);


  /* Detect photo mouse click */
  const imageClick = (e) => {
    console.log(e.target.attributes);
    //if (select == true) {
    //setSelect(select.push(e.target))
    //}
    /* Select */
    if (e.target.border == "0 px solid black") {
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
    setImageArray(imageArray => imageArray.filter((imageFile, idx) => String(idx) !== i));

  }

  const deletePhoto = () => {
    axios
      .delete('http://127.0.0.1:8183/api/photodelete/' + currentId)
      .then(() => {
        const images = imageArray.filter((image) => image.photoInfo.photo_id !== currentId);
        setImageArray(images);
        alert("successfully deleted");
      });
  }

  return (

    <div className='page'>
      <div className='photolibrary'>
        <LibraryHeader />
      </div>
      <div className='gallery'>
        {imageArray.map((imageElement, index) => {
          let customAttr = { 'data-photo_id': imageElement.photoInfo.photo_id }
          return (
            <div>
              {show ? (
                <ul
                  className="menu"
                  style={{
                    top: anchorPoint.y,
                    left: anchorPoint.x,
                    position: "absolute",
                    listStyleType: "none",
                    background: "white"
                  }}
                >

                  <Link
                    to={{
                      pathname: '/edit',
                      query: { targetsrc: imageElement.photoUrl }
                    }}>
                    <li>Edit</li> </Link>

                  <li onClick={() => deletePhoto()}>Delete</li>

                  <Link to='/metadata'><li>View Photo Metadata</li></Link>

                  <li>Make Public</li>

                  <li>Share to Social Media</li>


                </ul>
              ) : (
                <> </>
              )}
              <img onClick={imageClick} src={imageElement.photoUrl} {...customAttr} id={imageElement.photoInfo.photo_id} key={index} />
            </div>

          )
        })
        }
      </div>



      <div className='bottom_buttons'>
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
