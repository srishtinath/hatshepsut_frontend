import React, { Component } from 'react';
import Location from './Location'
import CurrentLocation from './CurrentLocation'
import CharacterChat from './CharacterChat'

import { connect } from 'react-redux'
import { setCurrentRoom } from '../actions/room'
import { setCurrentLocation } from '../actions/room'


class FirstRoom extends Component {

    state = {
        showZoomedLocation: false,
        showCharacterChat: false
    }

    // this will be set in a component above
    componentDidMount(){
        fetch("http://localhost:3000/rooms/23")
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
        this.setState({
            showZoomedLocation: !this.state.showZoomedLocation
        })
    }

    goToRoomDetails = (e) => {
        this.setState({
            showZoomedLocation: !this.state.showZoomedLocation
        })
    }

    handleCharacterChat = () => {
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
                {this.state.showCharacterChat ? 
                    <CharacterChat />
                : 
                <>
                    { room.character ? 
                    <div className="character-div" onClick={this.handleCharacterChat}>
                        <img src={room.character.image_url} alt={room.character.name} className="character-img"/>
                        { room.character.name }
                        { room.character.description }
                    </div>
                    : null }
                </>
                }
            </div>
            <div className="firstroom-content" style={{ backgroundImage: `url(${room.image_url})`}}>
                <h1> Welcome to {room.name}!</h1>
                { this.state.showZoomedLocation ? 
                <CurrentLocation currentLocation={this.props.location} goToRoomDetails={this.goToRoomDetails}/>
                : 
                <ul className="room-content-ul">

                {room.locations ? 
                <>
                { room.locations.map(loc => {
                    return (<li id={loc.id} onClick={this.setCurrentLocation} key={loc.id} >
                        <Location location={loc} items={loc.items} />
                    </li>)
                })}
                </>
                : null}
                </ul>}

                
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
    setCurrentLocation: setCurrentLocation
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FirstRoom);