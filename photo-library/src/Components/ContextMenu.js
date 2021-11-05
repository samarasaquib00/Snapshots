import { Component, useState } from "react";
import React from 'react'
import PhotoLibrary from "../Pages/PhotoLibrary";
import { Link } from 'react-router-dom';

class ContextMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elementID: null,
      xPos: "0px",
      yPos: "0px",
      show: false,
      images: this.props.imageArray
    }
    this.popUpState = false;
    this.handleClick = this.handleClick.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    }
  

  
   /* state = {
      xPos: "0px",
      yPos: "0px",
      show: false,
      images: this.props.imageArray
    }
*/

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
        //document.addEventListener("click", this.deletePhoto);

        //console.log(this.props)

    }
  
    

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    // for exiting the context menu
    handleClick = (e) => {
        if (this.state.showMenu) this.setState({ showMenu: false });
    }

  
    handleContextMenu = (e) => {
        e.preventDefault();
        console.log("Hello world", e)
      
        // if statement to determine if photo is being clicked
        if (e.target.localName === "img") {
          this.setState({
           elementID: e.target.getAttribute("id"),
           xPos: `${e.pageX}px`,
           yPos: `${e.pageY}px`,
           showMenu: true,
         })
       }
     }

    // Create Delete Function to be compatible with array
    deletePhoto(e) {

        //console.log(e.target.getAttribute("id"))
        //const i = e.target.getAttribute("id");
        console.log('elementId: ', this.state.elementID);
        this.props.handleDeleteImage(this.state.elementID)
        console.log(this.state.elementID)
        }
 
    /*togglePopup = () => {
      this.popUpState = !this.popUpState;
    }*/
    
      render() {
        const { showMenu, xPos, yPos } = this.state;
    
        if (showMenu)
          return (
            <ul

              className="menu"
              style={{
                top: yPos,
                left: xPos,
                position: "absolute",
                listStyleType: "none",
                background: "white"
              }}
            >
              <li>{this.props.first}</li>
              <li onClick={this.deletePhoto}>{this.props.second}</li>
              <Link to ='/metadata'><li>{this.props.third}</li></Link>
              <li>{this.props.fourth}</li>



            </ul>
          );
        else return null;
      }
      
}

export default ContextMenu;
