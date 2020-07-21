import React, { Component } from 'react';
import { connect } from 'react-redux'

class Location extends Component {


    render() { 
        let location = this.props.location
        return ( 
                <img src={location.image_url} 
                alt={location.name} 
                className="location-image" 
                onClick={this.showImages} 
                style={{position: 'absolute', bottom: `${location.positionY}%`, 
                left: `${location.positionX}%`, maxWidth: `${location.size}%`}}/>
         );
    }
}

let mapStateToProps = (state) => {
    return ({
        currentLocation: state.currentLocation,
    })
}
 
export default connect(mapStateToProps)(Location);