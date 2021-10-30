import React, { useState } from 'react'
import './Header.css'
import Logo from '../Logo.png';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Header() {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);

    return (
        <div className='header'>
            <div className='header_left'>
                {/* Logo */}
                <img className='header_logo' src={Logo} alt=""/>
            </div>
            <div className='header_right'>
                <div className= "HeaderIcon">
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        <PersonIcon/>
                    </DropdownToggle>
                    <DropdownMenu className='dropdown_menu_right'>
                        <Link to ='/login'><DropdownItem>Login</DropdownItem> </Link>
                        <Link to ='/signup'><DropdownItem>Sign Up</DropdownItem> </Link>
                        <DropdownItem divider />
                        <Link to ='/settings'><DropdownItem>Settings</DropdownItem> </Link>
                    </DropdownMenu>
                </ButtonDropdown>
                </div>
            </div>
        </div>
    )
}

export default Header
