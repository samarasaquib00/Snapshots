class AlbumButton extends React.Component{
    handleClick() {
        console.log(this);
    }
    
    render() {
        return (
            <button onClick={this.handleClick}>
                <text>Albums</text>  
            </button>
        );
    }
}