import React, { useRef, useState } from 'react';
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

    return (
        <div className= 'upload_box'>
            <div className= 'input_label'>
                <label>{label}</label>
            </div>
            <div className= 'drag_and_drop_label'>
                <p>Drag and Drop Your Files Here or</p>
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
    )
}

export default FileUpload
