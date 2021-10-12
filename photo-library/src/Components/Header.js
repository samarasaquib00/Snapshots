import React, { Profiler } from 'react'
import './Header.css'
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../Logo.png';

function Header() {
    return (
        <div className='header'>
            <div className='header_left'>
                {/* Logo */}
                <img className='header_logo' src={Logo} alt="" height={40} width={340} />
            </div>
            <div className='header_right'>
                <PersonIcon />
                {/* Profile Icon */}
            </div>
        </div>
    )
}

export default Header
