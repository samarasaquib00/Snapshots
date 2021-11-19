import React, {useState} from 'react'
import './Upload.css';
import FileUpload from '../Components/FileUpload';

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
        </div>
    )
}

export default Upload