import React, { Component } from 'react';
import Location from './Location'

import { connect } from 'react-redux'
import { setCurrentRoom } from '../actions/room'
import { setCurrentLocation } from '../actions/room'


class FirstRoom extends Component {

    // this will be set in a component above
    componentDidMount(){
        fetch("http://localhost:3000/rooms/16")
        .then(r => r.json())
        .then(fetchedRoom => {
            this.props.setCurrentRoom(fetchedRoom)
        })
    }

    // Onclick ==> setCurrentLocation
    setCurrentLocation = (event) => {
        fetch(`http://localhost:3000/locations/${event.target.parentNode.id}`)
        .then(r => r.json())
        .then(locationInfo =>{
            this.props.setCurrentLocation(locationInfo)
        })
    }

    render() 
    { 
        let room = this.props.currentRoom
        console.log(this.props.currentRoom)
        return ( 
            <div>
            <div className="firstroom-content" style={{ backgroundImage: `url(${room.image_url})`}}>
                <h1> Welcome to {room.name }!</h1>
                    {console.log(room.locations)}
                { room.locations ? 
                <ul>
                    { room.locations.map(loc => 
                        <li id={loc.id} onClick={this.setCurrentLocation}>
                            <Location location={loc} key={loc.id} items={loc.items}/>
                        </li>
                    )}
                </ul>
                : null}
            </div> 
            </div>);
    }
}

let mapStateToProps = (state) => {
    return {
        currentRoom: state.currentRoom
    }
}

let mapDispatchToProps = {
    setCurrentRoom: setCurrentRoom,
    setCurrentLocation: setCurrentLocation
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FirstRoom);