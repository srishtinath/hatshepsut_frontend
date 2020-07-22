import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { setCurrentRoom } from '../actions/room' 

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    goToRoom = (roomObj) => {
        this.props.setCurrentRoom(roomObj)
        this.props.history.push('/home/room')
    } 

    render() { 
        return ( 
        <div className="room-index">
        {this.props.allRooms.map(room => 
            <div key={room.id}>
                <img src={room.image_url} alt={room.name} className="room-index-img" onClick={() => this.goToRoom(room)}/>
            </div>

            )}
        </div> 
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        allRooms: state.allRooms
    }
}

let mapDispatchToProps = {
    setCurrentRoom
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rooms));