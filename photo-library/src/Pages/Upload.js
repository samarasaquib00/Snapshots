import React, {useState} from 'react'
import './Upload.css';
import FileUpload from '../Components/FileUpload';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popup from '../Components/Popup';

function Upload() {
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: []
    });

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    
    const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });
   
    return (
        <div className= 'upload'>
            <h1>Upload Page</h1>
            <FileUpload accept= ".jpg,.png,.jpeg" label="Upload Image(s)" 
            multiple updateFilesCb={updateUploadedFiles}/>
            <div className= 'upload_button'>
                <Button /*component={Link} to='/photolibrary'*/ variant="contained" size="medium" onClick={togglePopup}> {/*POST upload route here using 'files'*/}
                 Upload
                </Button>
                {isOpen && <Popup
                    content={<>
                        <b>Upload Error</b>
                        <p>We were unable to upload the chosen files</p>
                        <button onClick={togglePopup}>OK</button>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
    )
}

export default Upload