import React, { Component } from 'react';
import Location from './Location'

class FirstRoom extends Component {


    render() { 
        let room = this.props.room
        return ( 
            <div>
            <div className="firstroom-content zoomContainer" style={{ backgroundImage: `url(${room.image_url})`}}>
                <h1> Welcome to {room.name }!</h1>
                <ul>
                { room.locations.map(loc => 
                    <Location location={loc} key={loc.id} handleCluelist={this.props.handleCluelist}/>
                )
                }
                </ul>
            </div> 
            </div>);
    }
}
 
export default FirstRoom;