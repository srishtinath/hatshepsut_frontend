import React, { Component } from 'react';
import { connect } from 'react-redux'

class Location extends Component {

    state = { 
        toggleImages: false,
    }

    renderCurrentLocation = (locationObj) => {
        
    }


    render() { 
        return ( 
            <div id={this.props.location.id} onClick={this.renderCurrentLocation}>
                <h1>{this.props.location.name}</h1>
                <img src={this.props.location.image_url} alt={this.props.location.name} className="location-image" onClick={this.showImages}/>
            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return ({
        currentLocation: state.currentLocation,
    })
}
 
export default connect(mapStateToProps)(Location);