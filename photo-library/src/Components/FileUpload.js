import axios from 'axios';
import React, { useRef, useState } from 'react';
import Popup from './Popup';
import Button from '@mui/material/Button';
import './FileUpload.css';

const MAX_FILE_SIZE_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) => 
Object.keys(nestedObj).map((key) => nestedObj[key]);

const FileUpload = ({
    label,
    updateFilesCb,
    maxFileSizeInBytes = MAX_FILE_SIZE_BYTES,
    ...otherProps
  }) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    
    const handleFormButtonClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size < maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return {...files};
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

         
    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    async function uploadtodb() {
        const filesAsArray = convertNestedObjectToArray(files)
        for(const element of filesAsArray) {
            let res = await axios.post('127.0.0.1:8183/api/photoupload?uid=1', element)
            let data = res.data;
            console.log(data);
        }
    }

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className="upload_container">
            <div className= 'upload_box'>
                <div className= 'input_label'>
                    <label>{label}</label>
                </div>
                <div className= 'drag_and_drop_label'>
                    <p>Click the Button Below to Choose Files to Upload</p>
                </div>
                <div className= 'upload_files_button'>
                    <button type= "button" onClick= {handleFormButtonClick}>
                        <i className= "fas fa-file-upload" />
                        <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                    </button> 
                </div>
                <div className= 'form_field'>
                    <input type= "file" ref={fileInputField} onChange={handleNewFileUpload} title= "" value= "" {...otherProps} />
                </div>
            </div>
            <div className='upload_table'>
                <span>To Upload</span>
                <div className='preview_list'>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === 'image';
                        return (
                            <div className='image_container' key={fileName}>
                                <div>
                                    {isImageFile && (<img className='image_preview' src={URL.createObjectURL(file)}
                                        alt={'file preview ${index}'}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className= 'upload_button'>
                <Button /*component={Link} to='/photolibrary'*/ variant="contained" size="medium" onClick={uploadtodb}> {/*POST upload route here using 'files'*/}
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

export default FileUpload
