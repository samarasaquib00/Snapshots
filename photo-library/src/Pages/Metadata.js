import React, { useEffect, useState } from 'react'
import './Metadata.css'
import { useLocation } from 'react-router-dom'

const axios = require('axios');

function Metadata() {
    const {location, query} = useLocation();
    const [metadata, setMetadata] = useState({date_uploaded: '', file_format: '', hash: '', 
    is_original: false, is_public: false, photo_id: 0, uploader: 0, uploader_name: ''})

    useEffect(() => {
        axios.get('http://127.0.0.1:8183/api/photometadata/' + query).then(res => {
          let data = res.data;
          //save the metadata of the photo
          const newobj = {date_uploaded: data.date_uploaded,
            file_format: data.file_format, hash: data.hash, is_original: data.is_original, is_public: data.is_public,
            photo_id: data.photo_id, uploader: data.uploader, uploader_name: data.uploader_name};
          setMetadata(newobj);
        });
    }, []);

    return (
        <div className='meta_page'>
            <h1>Metadata</h1>
            <div className='metadata'>
                <p>date_uploaded: {metadata.date_uploaded}</p>
                <p>file_format: {metadata.file_format}</p>
                <p>hash: {metadata.hash}</p>
                <p>is_original: {String(metadata.is_original)}</p>
                <p>is_public: {String(metadata.is_public)}</p>
                <p>photo_id: {metadata.photo_id}</p>
                <p>uploader: {metadata.uploader}</p>
                <p>uploader_name: {metadata.uploader_name}</p>
            </div>
        </div>
    )
}

export default Metadata
