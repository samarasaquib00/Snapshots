import React, { useState } from 'react'
import './Header.css'
import Logo from '../Logo.png';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Header() {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        console.log("after clearing: ", document.cookie)
    }

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
                        <DropdownItem divider />
                        <Link to ='/'><DropdownItem onClick={deleteAllCookies}>Log Out</DropdownItem></Link>


                    </DropdownMenu>
                </ButtonDropdown>
                </div>
            </div>
        </div>
    )
}

export default Header
