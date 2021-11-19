import React from 'react'
import './Metadata.css'
import { useLocation } from 'react-router-dom'


function Metadata() {
    const {date_loc, date_uploaded} = useLocation()
    const {file_loc, file_format} = useLocation()
    const {hash_loc, hash} = useLocation()
    const {orig_loc, is_original} = useLocation()
    const {pub_loc, is_public} = useLocation()
    const {id_loc, photo_id} = useLocation()
    const {uploadid_loc, uploader} = useLocation()
    const {uploadname_loc, uploader_name} = useLocation()

    return (
        <div className='meta_page'>
            <h1>Metadata Page</h1>
            <div className='metadata'>
                <p>date_uploaded: {date_uploaded}</p>
                <p>file_format: {file_format}</p>
                <p>hash: {hash}</p>
                <p>is_original: {is_original}</p>
                <p>is_public: {is_public}</p>
                <p>photo_id: {photo_id}</p>
                <p>uploader: {uploader}</p>
                <p>uploader_name: {uploader_name}</p>
            </div>
        </div>
    )
}

export default Metadata
