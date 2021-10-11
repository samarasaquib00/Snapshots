import './Sidebar.css';
import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className= "spacer"> 
        <div className= "Sidebar">
        <ul className= "SidebarList">
            {SidebarData.map((val,index)=> {
                return (
                    <li key={index} 
                    className= "row"
                    id={window.location.pathname == val.link ? "active" : ""}
                    onClick={()=> {window.location.pathname = val.link}}>
                    <Link to ={val.link}>
                            {val.icon}
                         <span>
                            {val.title}
                        </span>
                    </Link>

                    </li>
                )
            })}
        </ul>
        </div>
    </div>
  )
}

export default Sidebar