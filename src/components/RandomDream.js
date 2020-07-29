import React, {Component}from 'react';
import CharacterChat from './CharacterChat'

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

    componentDidMount(){
        this.props.setCurrentCharacter(this.props.allRooms[4].character)
        this.setState({
            showCharacterChat: true
        })
    }
    goBack = () => {
        this.props.addToUserRoom(this.props.allRooms[4])
        this.props.setCurrentRoom(this.props.allRooms[3])
        this.props.closeDream()
        this.props.history.push("/home/room")
    }

    showCharacterChat = () => {
        this.setState({
            showCharacterChat: !this.state.showCharacterChat
        })
    }

    render() { 
        let room=this.props.allRooms[4]
        return ( 
            <div className="random-dream">
                    <div className="random-dream-character" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "cover"}}>
                        <img 
                        src={room.character.image_url} 
                        alt={room.character.name} 
                        className={room.name} />
                        <div className="dream-state-chat">
                            <p>Dream state chat will go here!</p>
                        </div>
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