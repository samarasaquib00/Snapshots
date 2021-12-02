import React, { useEffect, useState, useCallback } from 'react'
import './PhotoLibrary.css'
//import LibraryHeader from '../Components/LibraryHeader';
import '../Components/LibraryHeader.css'
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

// Create Array of Images
//let imageArray = [Photo, Photo2, Photo3, Photo4, Photo6, Photo7, Photo8, Photo9, Photo10, 
//  Photo11, Photo12, Photo13, Photo14, Photo15, Photo16]

const axios = require('axios');

function PhotoLibrary() {

  //make imagearray into state
  const [imageArray, setImageArray] = useState([])
  const [value, setValue] = useState(0)


  //onclick on images
  const [select, setSelect] = useState(false)

  //append to this list
  //const [selected, setSelected] = useState([])

  const selection = () => {
    //unselect or select
    setSelect(!select)
  }

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [currentId, setCurrentId] = useState(null);
  const [photoObject, setPhotoObject] = useState(null);
  const [show, setShow] = useState(false);

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      const currentId = event.target.getAttribute("id");
      setCurrentId(currentId)
      setPhotoObject(event.target.src);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      if (event.target.localName === "img") {
        setShow(true);
      }
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
    axios.get('http://127.0.0.1:8183/api/photometadatalist').then(res => {
      let data = res.data;
      //console.log("data: ", data)
      let photoIdArray = [];
      for (const element of data.result) {
          console.log(element);
          console.log(element.is_public);
          if(element.is_public){
                photoIdArray.push({ photoUrl: 'http://127.0.0.1:8183/api/photo/' + element.photo_id, photoInfo: element });
          }
      }
        if (photoIdArray.length != imageArray.length) {
          setImageArray(photoIdArray);
        }
    })
    console.log("running useEffect")
  }, [imageArray]);   //infinite loop because imagearray keeps getting updated
  // 





  /* Detect photo mouse click (updated for Photo Viewing Window, not Select) */
  const imageClick = (e) => {
    console.log(e.target.attributes);
    //if (select == true) {
    //setSelect(select.push(e.target))
    //}
    /* Select */
    //if (e.target.border == "0 px solid black") {
    //  e.target.border = "3 px solid black";
    //setSelected(selected.push(e.target))    delete this
    //} else { /* Deselect */
    //  e.target.border = "0 px solid black";
    //  const name = e.target.getAttribute("name");
    //setSelected(selected.filter(pic=>pic.name!=name));

    //console.log(selected);
    /* End Select */

    /*
    <Link
      to={{
      pathname: 'PhotoPreviewWindow,
      query: { targetsrc: photoObject }
      }}>
    <li>Edit</li> </Link>
    */

  }


  //old delete
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
    setValue(value + 1);

  }

  //new delete
  const deletePhoto = () => {
    axios
      .delete('http://127.0.0.1:8183/api/photodelete/' + currentId)
      .then(() => {
        const images = imageArray.filter((image) => image.photoInfo.photo_id !== currentId);
        setImageArray(images);
        setValue(value + 1)
        alert("Successfully Deleted");
      });
  }


  /* Function to Sort photos */
  const sortPhotos = (sortOrder) => {
    //make a copy of image array
    const copyArray = [...imageArray];
    if (sortOrder === "ascending") {
      
      copyArray.sort((image1, image2) => {
        return new Date(image1.photoInfo.date_taken) - new Date(image2.photoInfo.date_taken);
      })
      console.log("sorting in ascending order")
    } else {
      copyArray.sort((image1, image2) => {
        return new Date(image2.photoInfo.date_taken) - new Date(image1.photoInfo.date_taken);
      })
      console.log("sorting in descending order")
    }
    console.log("imageArray: ", imageArray)
    console.log("copyArray: ", copyArray)
    setImageArray(copyArray)
    setValue(value + 1)
    //get the date_taken from the photos in image array
  }
  
    /* Function to Sort photos by date uploaded */
  const sortPhotosUploadDate = (sortOrder) => {
    //make a copy of image array
    const copyArray = [...imageArray];
    if (sortOrder === "upload") {
      copyArray.sort((image1, image2) => {
        return new Date(image1.photoInfo.date_uploaded) - new Date(image2.photoInfo.date_uploaded);
      })
      console.log("sorting by upload date")
    }
    console.log("imageArray: ", imageArray)
    console.log("copyArray: ", copyArray)
    setImageArray(copyArray)
    setValue(value + 1)
    //get the date_taken from the photos in image array
  }


  const addtoFavorites = () => {
    axios.post('http://127.0.0.1:8183/api/tempfavoriteupdate/' + currentId + '?is_favorite=true').then(res => {
      let data = res.data;
      console.log(data);
    })
  }

  const makePrivate = () => {
      axios.post('http://127.0.0.1:8183/api/photometadata/' + currentId + "?is_public=false").then(res => {
      let data = res.data;
      console.log(data);
    })
  }

  return (

    /* SORT DROPDOWN */
    <div className='page'>
      <div className='photolibrary'>
        <div className='library_header'>
          <div className='library_header_left'>
            <h1>Public Photos</h1>
          </div>
          <div className='library_header_right'>
            {/* sort button goes here, css needs to be fixed */}
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                Sort
              </DropdownToggle>
              <DropdownMenu className='dropdown_menu_right'>
                <DropdownItem onClick={()=>sortPhotos("ascending")}>Sort by Date (Ascending)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>sortPhotos("descending")}>Sort by Date (Descending)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => sortPhotosUploadDate("upload")}>Revert to Uploaded Order</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
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
                      query: { targetsrc: photoObject }
                    }}>
                    <li>Edit</li> </Link>

                  <li onClick={() => deletePhoto()}>Delete</li>

                  <Link to={{
                    pathname: '/metadata',
                    query: currentId
                  }}>
                    <li>View Photo Metadata</li></Link>

                  <li onClick={makePrivate}>Make Private</li>

                  <li onClick={addtoFavorites}>Add to Favorites</li>
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
