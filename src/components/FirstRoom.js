import React, { Component } from 'react';
import Location from './Location'
import CurrentLocation from './CurrentLocation'
import CharacterChat from './CharacterChat'

import { connect } from 'react-redux'
import { setCurrentRoom, setCurrentCharacter } from '../actions/room'
import { setCurrentLocation } from '../actions/room'

import Zoom from 'react-reveal/Zoom';


class FirstRoom extends Component {

    state = {
        showZoomedLocation: false,
        showCharacterChat: false,
        numberOfLocations: 0,
        clickCount: 0,
    }

    componentDidMount(){
        if (this.props.currentRoom.locations){
            this.setState({
                numberOfLocations: this.props.currentRoom.locations.length
            })
        }
    }

    // Onclick ==> setCurrentLocation
    setCurrentLocation = (event) => {
        fetch(`http://localhost:3000/locations/${event.target.parentNode.id}`)
        .then(r => r.json())
        .then(locationInfo =>{
            this.props.setCurrentLocation(locationInfo)
        })
        this.setState({
            showZoomedLocation: !this.state.showZoomedLocation,
            clickCount: this.state.clickCount + 1
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

    handleRoomComplete = () => {
        console.log("Room complete!")
        // add to UserRoom
    }

    render() 
    { 
        let room = this.props.currentRoom
        console.log(this.state.numberOfLocations, this.state.clickCount)
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
                    { this.state.numberOfLocations <= this.state.clickCount ? 
                    <>
                        <Zoom>
                            <button className="next-room-btn" onClick={this.handleRoomComplete}>Go to next room</button>
                        </Zoom>
                    </>
                    : null  
                    }
                    </>
                    }
                </div>
                </>
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