import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PhotoIcon from '@mui/icons-material/Photo';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';

export const SidebarData = [
   {
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
   },
   {
        title: "Photo Library",
        icon: <PhotoIcon />,
        link: "/photolibrary",
    },
    {
        title: "Upload",
        icon: <AddToPhotosIcon />,
        link: "/upload",
   },
   {
        title: "Albums",
        icon: <PhotoAlbumIcon />,
        link: "/albums",
    }
] 
 