import './Sidebar.css';
import React, { useState } from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';

function Sidebar() {

  var [currentPage, setstate] = useState(window.location.pathname)
  const changeState = (page) => {
    console.log('changing state', page)
    return setstate(currentPage = page)
  }

  return (
    <div className="spacer">
      <div className="Sidebar">
        <ul className="SidebarList">
          {SidebarData.map((val, index) => {
            console.log(currentPage)
            return (
              <li key={index}
                className="row"
                id={currentPage == val.link ? "active" : ""}
                onClick={() => changeState(val.link)}>
                <Link to={val.link}>
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