import React, { Component } from 'react';
import Location from './Location'
import CurrentLocation from './CurrentLocation'
import CharacterChat from './CharacterChat'

import { connect } from 'react-redux'
import { setCurrentRoom, setCurrentCharacter } from '../actions/room'
import { setCurrentLocation } from '../actions/room'


class FirstRoom extends Component {

    state = {
        showZoomedLocation: false,
        showCharacterChat: false
    }

    // this will be set in a component above
    componentDidMount(){
        fetch("http://localhost:3000/rooms/")
        .then(r => r.json())
        .then(fetchedRooms => {
            this.props.setCurrentRoom(fetchedRooms[0])
        })
    }

    // Onclick ==> setCurrentLocation
    setCurrentLocation = (event) => {
        fetch(`http://localhost:3000/locations/${event.target.parentNode.id}`)
        .then(r => r.json())
        .then(locationInfo =>{
            this.props.setCurrentLocation(locationInfo)
        })
        this.setState({
            showZoomedLocation: !this.state.showZoomedLocation
        })
    }

    goToRoomDetails = (e) => {
        this.setState({
            showZoomedLocation: !this.state.showZoomedLocation
        })
    }

    handleCharacterChat = (e) => {
        // console.log(this.props.currentRoom.character.id)
        fetch(`http://localhost:3000/characters/${this.props.currentRoom.character.id}`)
        .then(r => r.json())
        .then(characterFetched => 
            // {console.log(characterFetched)
            {this.props.setCurrentCharacter(characterFetched)})
        this.setState({
            showCharacterChat: !this.state.showCharacterChat
        })
    }


    render() 
    { 
        let room = this.props.currentRoom
        // console.log(this.props.currentRoom)
        return ( 
            <>
            <div className="character-content">
                <>
                    <div className="firstroom-content" style={{ backgroundImage: `url(${room.image_url})`}}>
                    {/* <h1> Welcome to {room.name}!</h1> */}

                    { this.state.showZoomedLocation && !this.state.showCharacterChat ? 
                    <CurrentLocation currentLocation={this.props.location} goToRoomDetails={this.goToRoomDetails}/>
                    : 
                    <>
                    {!this.state.showCharacterChat ? 
                    <>
                    { room.character ? 
                        <div className="character-div" onClick={this.handleCharacterChat}>
                            <img src={room.character.image_url} alt={room.character.name} className="character-img"/>
                        </div>
                    : null}
                    <div className="room-content-div">
                        <div className="firstroom-instructions">
                            <p>Welcome to the first room!</p>
                            <p>Looks like this was Tess's tent. Click around and see if you can find any clues.</p>
                        </div>
                        {room.locations ? 
                            <>
                            { room.locations.map(loc => {
                                return (<div id={loc.id} onClick={this.setCurrentLocation} key={loc.id} >
                                    <Location location={loc} items={loc.items} />
                                </div>)
                            })}
                            </>
                        : null}
                    </div>
                    </>
                    :
                    <CharacterChat room={room} toggleRoom={this.handleCharacterChat}/>
                    }
                    </>
                    }
                </div>
                </>
                {/* } */}
            </div>
            </>);
    }
}

let mapStateToProps = (state) => {
    return {
        currentRoom: state.currentRoom
    }
}

let mapDispatchToProps = {
    setCurrentRoom: setCurrentRoom,
    setCurrentLocation: setCurrentLocation,
    setCurrentCharacter: setCurrentCharacter
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FirstRoom);