import React, { Component } from 'react';
import { connect } from 'react-redux'

class Location extends Component {


    render() { 
        return ( 
            <div id={this.props.location.id} style={{position: 'absolute', top: '0', right: '0'}}>
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