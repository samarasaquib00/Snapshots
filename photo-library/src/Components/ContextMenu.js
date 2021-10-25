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
              }}
            >
              <li>Login</li>
              <li>Register</li>
              <li>Open Profile</li>
            </ul>
          );
        else return null;
      }
}