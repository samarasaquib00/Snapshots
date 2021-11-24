import { Component, useState } from "react";
import React from 'react'

import PhotoLibrary from "../Pages/PhotoLibrary";
import { Link } from 'react-router-dom';

class ContextMenu extends Component {

  //const[target, setTarget] = useState(0);

  constructor(props) {
    super(props);
    this.state = {
      elementID: null,
      target: null,
      targetsrc: null,
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
    console.log(e);
    e.preventDefault();
    console.log("Hello World")

    // if statement to determine if photo is being clicked
    if (e.target.localName === "img") {
      console.log("here")
      console.log(e.target.getAttribute("metaInfo"))
      this.setState({
        elementID: e.target.getAttribute("id"),
        target: e.target,
        targetsrc: e.target.src,
        xPos: `${e.pageX}px`,
        yPos: `${e.pageY}px`,
        showMenu: true,
      })
      console.log("target: ", e);
      let target = e.target;
      let targetsrc = target.src;
      //console.log("target2: ", this.state.target)

    }
  }

  // Create Delete Function to be compatible with array
  deletePhoto(e) {
    this.props.handleDeleteImage(this.state.elementID)
  }

  /*togglePopup = () => {
    this.popUpState = !this.popUpState;
  }*/

  render() {
    const { showMenu, xPos, yPos, targetsrc } = this.state;

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

          <Link
            to={{
              pathname: '/edit',
              query: { targetsrc }
            }}
            state={{ target: this.state.target }}>
            <li>{this.props.first}</li> </Link>

          <li onClick={this.deletePhoto}>{this.props.second}</li>

          <Link to='/metadata'><li>{this.props.third}</li></Link>

          <li>{this.props.fourth}</li>

          <li>{this.props.fifth}</li>


        </ul>
      );
    else return null;
  }

}

export default ContextMenu;
