import React, {useState} from 'react'
import './PhotoAlbum.css'
import AlbumHeader from '../Components/AlbumHeader'
import AlbumIcon from '../test-images/folder.png'

function PhotoAlbum() {

    //onclick on images
    const [select, setSelect] = useState(false)

    //append to this list
    const [selected, setSelected] = useState([])

    const selection = () => { 
        //unselect or select
        setSelect(!select)
        
    }

    const imageClick = (e) => {
        
        console.log(e.target.attributes);
        //if (select == true) {
            e.target.border = "3 px solid black";
            //setSelect(select.push(e.target))
        //}
        
    } 

    return (
        <div className= 'page'>
            <div className= 'photoAlbum'>
                <AlbumHeader />
            </div>

            <div className= 'album_gallery'>     
                <div class='album_image'>
                    <img onClick={imageClick} className='sample_album1' src={AlbumIcon} alt="" />
                    <h3><span>Album 1</span></h3>
                </div>               

                <div class='album_image'>
                    <img onClick={imageClick} className='sample_album2' src={AlbumIcon} alt="" />
                    <h3><span>Album 2</span></h3>
                </div>

                <div class='album_image'>
                    <img onClick={imageClick} className='sample_album3' src={AlbumIcon} alt="" />                    
                    <h3><span>Album 3</span></h3>
                </div>

                <div class='album_image'>
                    <img onClick={imageClick} className='sample_album4' src={AlbumIcon} alt="" />
                    <h3><span>Album 4</span></h3>
                </div>
            </div>

            <div className= 'bottom_buttons'>
                {/*adding select/delete buttons potentially*/}
            </div>
        </div>
    )
}

export default PhotoAlbum