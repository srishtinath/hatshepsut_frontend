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
        return ( 
        <div className="room-index">
        {this.props.allRooms.map(room => 
            <div key={room.id} className="room-index-img">
                <div><img src={room.image_url} alt={room.name} className="room-img-underlay" onClick={() => this.goToRoom(room)}/></div>
                {/* <div className="room-index-overlay"><p>{room.name}</p></div> */}
                {/* If roomId can be found in UserRoom, then add black box with opacity 0.3 saying Completed */}
                { Boolean(this.props.userRooms.find(userRoom => userRoom.room_id === room.id)) ? 
                <>
                <div className="room-complete">Room Complete</div>
                </>
                : null }
            </div>

            )}
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