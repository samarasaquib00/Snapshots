import React from 'react'
import './Header.css'
import { HeaderData } from './HeaderData';
import Logo from '../Logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header'>
            <div className='header_left'>
                {/* Logo */}
                <img className='header_logo' src={Logo} alt=""/>
            </div>
            <div className='header_right'>
                <ul className= "HeaderIcon">
                    {HeaderData.map((val,index)=> {
                        return (
                        <li key={index} 
                        className= "icon"
                        id={window.location.pathname == val.link ? "active" : ""}
                        onClick={()=> {window.location.pathname = val.link}}>
                        <Link to ={val.link}>
                                {val.icon}
                        </Link>

                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Header
