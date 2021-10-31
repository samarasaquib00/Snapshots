import React from 'react'
import './ToggleSwitch.css'

const ToggleSwitch = ({ isOn, handleToggle }) => {
    return (
      <>
        <input checked={isOn} onChange={handleToggle} className="react_switch_checkbox" id={`react_switch_new`} type="checkbox"/>
        <label className="react_switch_label" htmlFor={`react_switch_new`}>
          <span className={`react_switch_button`} />
        </label>
      </>
    );
  };

export default ToggleSwitch
