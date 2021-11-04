import { Component } from "react";
import React from 'react'
import PhotoLibrary from "../Pages/PhotoLibrary";
class ContextMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xPos: "0px",
      yPos: "0px",
      show: false,
      images: this.props.imageArray
    }
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
           xPos: `${e.pageX}px`,
           yPos: `${e.pageY}px`,
           showMenu: true,
         })
       }
     }

    // Create Delete Function to be compatible with array
    deletePhoto() {
      // get the index of the image we are right clicking on

           // remove the photo from the array



                  /*for (let i = 0; i < imageArray.length; i++) {
                      if (e.target.attributes.src == imageArray[i].attributes.src) {
                          //imageArray[i] = null;

                      }
                  }*/
                  console.log(this.props.imageArray)
                      // use console to find something different in each image, such as the src
        }
  

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
                'list-style-type': "none",
                background: "white"
              }}
            >
              <li>{this.props.first}</li>
              <li onClick={this.deletePhoto}>{this.props.second}</li>
              <li>{this.props.third}</li>
              <li>{this.props.fourth}</li>



            </ul>
          );
        else return null;
      }
      
}

export default ContextMenu;
