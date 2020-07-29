import React, {Component}from 'react';
import Character from './Character'

import { connect } from 'react-redux'
import { setCurrentRoom, setCurrentCharacter, setCurrentLocation, addToUserRoom } from '../actions/room'
import { withRouter } from 'react-router'

class RandomDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showCharacterChat: false
         }
    }

    goBack = () => {
        this.props.history.push("/home/rooms")
        this.props.addToUserRoom(this.props.allRooms[4])
        this.props.setCurrentRoom(this.props.allRooms[5])
        this.props.closeDream()
    }

    showCharacterChat = () => {
        this.setState({
            showCharacterChat: !this.state.showCharacterChat
        })
    }

    render() { 
        let room=this.props.allRooms[4]
        return ( 
            <div className="character-content">
                    <div className="firstroom-content" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "cover"}}>
            <Character room={room} showCharacterChat={this.showCharacterChat} zoomState={this.state.showCharacterChat}/>
                    </div>
                    <button onClick={this.goBack} className="go-back-btn">Go back to exploring...</button>
                    </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        allRooms: state.allRooms,
        userRooms: state.userRooms,
    }
}

let mapDispatchToProps = {
    setCurrentRoom: setCurrentRoom,
    setCurrentLocation: setCurrentLocation,
    setCurrentCharacter: setCurrentCharacter,
    addToUserRoom: addToUserRoom
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RandomDream));