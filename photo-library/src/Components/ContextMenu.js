import { Component } from "react";
import React from 'react'
import Popup from './Popup'

class ContextMenu extends Component {
    state = {
        xPos: "0px",
        yPos: "0px",
        show: false
    }

    /*popupstate = {
      xPos: "0px",
      yPos: "0px",
      show: false
    }*/

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }
  
    

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    // for exiting the context menu
    handleClick = (e) => {
        if (this.state.showMenu) this.setState({ showMenu: false });
    }

    /*togglePopup = (e) => {
      if (this.popupstate.showPopup) this.setState({ showPopup: false });
    }*/
  
    handleContextMenu = (e) => {
        e.preventDefault();
        console.log("Hello world", e)
      
        // if statement to determine if photo is being clicked
        if (e.target.localName === "img") {
          this.setState({
           xPos: `${e.pageX}px`,
           yPos: `${e.pageY}px`,
           showMenu: true,
         })
       }
     }

      render() {
        const { showMenu, xPos, yPos } = this.state;
        /*const { showPopup, xPos2, yPos2 } = this.popupstate;*/
    
        if (showMenu)
          return (
            <ul
              className="menu"
              style={{
                top: yPos,
                left: xPos,
                position: "absolute",
                'list-style-type': "none",
                background: "white"
              }}
            >
              
              <li>{this.props.first}</li>
              <li>{this.props.second}</li>
              <li /*onClick={togglePopup}*/>{this.props.third}</li>
              {/*{isOpen && <Popup
                    content={<>
                        <b>View Metadata</b>
                        <p>We were unable to view the metadata for the chosen photo</p>
                        <button onClick={togglePopup}>OK</button>
                    </>}
                    handleClose={togglePopup}
                />}
              */}

            </ul>
          );
        else return null;
      }
      
}

export default ContextMenu;
