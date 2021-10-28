import { Component } from "react";
import React from 'react'
class ContextMenu extends Component {
    state = {
        xPos: "0px",
        yPos: "0px",
        show: false
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({ showMenu: false });
    }

    handleContextMenu = (e) => {
        e.preventDefault();
      
        this.setState({
          xPos: `${e.pageX}px`,
          yPos: `${e.pageY}px`,
          showMenu: true,
        });
      };

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
              <li>{this.props.second}</li>
            </ul>
          );
        else return null;
      }
}

export default ContextMenu;