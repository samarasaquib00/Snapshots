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

  //save photo metadata for display
  const [metadata, setMetadata] = useState({date_uploaded: '', file_format: '', hash: '', 
          is_original: false, is_public: false, photo_id: 0, uploader: 0, uploader_name: ''});

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
        alert("Successfully Deleted");
      });
  }

  const getMetadata = () => {
    axios.get('http://127.0.0.1:8183/api/photometadata/' + currentId).then(res => {
      let data = res.data;
      console.log(data);
      console.log(data.photo_id);
      //save the metadata of the photo
      const newobj = {date_uploaded: data.date_uploaded,
        file_format: data.file_format, hash: data.hash, is_original: data.is_original, is_public: data.is_public,
        photo_id: data.photo_id, uploader: data.uploader, uploader_name: data.uploader_name};
      console.log(newobj);
      setMetadata(newobj);
      console.log(metadata);
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
                  <div className='context' onClick={getMetadata}>
                    <Link
                      to={{
                        pathname: '/edit',
                        query: { targetsrc: imageElement.photoUrl }
                      }}>
                      <li>Edit</li> </Link>

                    <li onClick={() => deletePhoto()}>Delete</li>
                  
                    <Link to={{
                      pathname: '/metadata', 
                      date_uploaded: metadata.date_uploaded,
                      file_format: metadata.file_format,
                      hash: metadata.hash, 
                      is_original: metadata.is_original, 
                      is_public: metadata.is_public, 
                      photo_id: metadata.photo_id, 
                      uploader: metadata.uploader, 
                      uploader_name: metadata.uploader_name}}>
                    <li>View Photo Metadata</li></Link>

                    <li>Make Public</li>

                    <li>Share to Social Media</li>
                  </div>
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
    </div>
  )
}

export default PhotoLibrary
