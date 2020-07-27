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

    guessCulprit = (e) => {
        this.props.history.push('/guess')
    }

    render() { 
        let filteredRooms = this.props.allRooms.filter(room => room.display === true)
        return ( 
        <div className="room-index">
            <h2>Rooms to explore:</h2>
            <ul>
        {filteredRooms.map(room => 
            <div key={room.id} className="room-index-img" onClick={() => this.goToRoom(room)}>  
                { Boolean(this.props.userRooms.find(userRoom => userRoom.room_id === room.id)) ? 
                <strike className="room-complete"><li>{room.name} </li></strike>
                : <li>{room.name} | {room.description}</li> }
            </div>

            )}
            </ul>
            {this.props.userRooms.length >= this.props.allRooms.length ? 
            <button className="guess-culprit" onClick={this.guessCulprit}>Guess the culprit!</button>
            : null}
        </div> 
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        allRooms: state.allRooms,
        userRooms: state.userRooms
    }
}

let mapDispatchToProps = {
    setCurrentRoom
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rooms));