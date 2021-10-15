import React, {useState} from 'react'
import './Upload.css';
import FileUpload from '../Components/FileUpload';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Upload() {
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: []
    });
    
    const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });
   
    return (
        <div className= 'upload'>
            <h1>Upload Page</h1>
            <FileUpload accept= ".jpg,.png,.jpeg" label="Upload Image(s)" 
            multiple updateFilesCb={updateUploadedFiles}/>
            <div className= 'upload_button'>
                <Button component={Link} to='/photolibrary' variant="contained" size="medium">
                 Upload
                </Button>
            </div>
        </div>
    )
}

export default Upload