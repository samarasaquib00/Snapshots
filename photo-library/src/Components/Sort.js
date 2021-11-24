import SortButton from './Sort.css'
import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';



  const Sort = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);
  
    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Sort
        </DropdownToggle>
        <DropdownMenu className='dropdown_menu_right'>
          <DropdownItem>Sort by Date (Ascending)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Sort by Date (Descending)</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
  

  export default Sort
