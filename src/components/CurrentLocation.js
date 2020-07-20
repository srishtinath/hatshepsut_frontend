import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Items from './Items'

import Zoom from 'react-reveal/Zoom';


class CurrentLocation extends Component {
    
    render() { 
        console.log(this.props.currentLocation.items)
        return ( <>
            <Zoom>
                <div className="location-items">
                < Items items={this.props.currentLocation.items} goToRoomDetails={this.props.goToRoomDetails}/>
                </div>
            </Zoom>
            </>
             );
    }
}
 
let mapStateToProps = (state) => {
    return ({
        currentLocation: state.currentLocation
    })
}

export default connect(mapStateToProps)(withRouter(CurrentLocation));