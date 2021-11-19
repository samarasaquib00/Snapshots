import SortButton from './Sort.css'
import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';



/*class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
      }


    myFunction() {
        this.ref.current.classList.toggle("show");
        //document.getElementById("myDropdown").classList.toggle("show");
        console.log(this.ref.onclick)
    }


      render() {
          return (
        <div class="dropdown">
        <button onclick={this.myFunction} ref={this.ref} class="SortButton">Sort</button>

        <div id="myDropdown" class="drpdown-content">
            <a href="#home">Sort by Date</a>
            <a href="#about">Sort by Geolocation</a>
        </div>
        </div>
        
          )
      }
}


  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.SortButton')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  */



  const Sort = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);
  
    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Sort
        </DropdownToggle>
        <DropdownMenu className='dropdown_menu_right'>
          <DropdownItem>Sort by Date</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Sort by Geolocation</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
  

  export default Sort
