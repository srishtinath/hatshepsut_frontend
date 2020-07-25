import React, { Component } from 'react';
import Location from './Location'
import CurrentLocation from './CurrentLocation'
import Character from './Character'
import Directions from './Directions'

import { connect } from 'react-redux'
import { setCurrentRoom, setCurrentCharacter, setCurrentLocation, addToUserRoom } from '../actions/room'
import { withRouter } from 'react-router'

import Tada from 'react-reveal/Tada';


class FirstRoom extends Component {

    state = {
        showDirections: true,
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
        if (this.props.userRooms){
            this.setState({
                showDirections: false
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

    showCharacterChat = (e) => {
        this.setState({
            showCharacterChat: !this.state.showCharacterChat
        })
    }

    closeDirections = () => {
        this.setState({
            showDirections: !this.state.showDirections
        })
    }

    handleRoomComplete = (e) => {
        console.log("Room complete!")
        // add to UserRoom
        let allRoomIds = this.props.userRooms.map(roomObj => roomObj.room_id)
        if (!allRoomIds.includes(this.props.currentRoom.id)){
        fetch("http://localhost:3000/user_rooms", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }, 
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                room_id: this.props.currentRoom.id
            })
        }).then(r => r.json())
        .then(userRoomObj => 
            this.props.addToUserRoom(userRoomObj))
            let currentRoomId = this.props.currentRoom.id
            let nextRoomObj = this.props.allRooms.find(roomObj => roomObj.id === (currentRoomId + 1))
            if (nextRoomObj){
                this.props.setCurrentRoom(nextRoomObj)
                this.setState({
                    clickCount: 0
                })
            } else {
                e.target.innerText = "Guess the culprit!"
            }
        } else if (e.target.innerText === "Guess the culprit!"){
            console.log("Hellooo")
            this.props.history.push('/guess')
        } else {
            let currentRoomId = this.props.currentRoom.id
            let nextRoomObj = this.props.allRooms.find(roomObj => roomObj.id === (currentRoomId + 1))
            if (nextRoomObj){
                this.props.setCurrentRoom(nextRoomObj)
                this.setState({
                    clickCount: 0
                })
            } else {
                e.target.innerText = "Guess the culprit!"
            }
        }

    }

    componentWillUnmount(){
        this.setState({
            clickCount: 0
        })
    }

    render() 
    { 
        let room = this.props.currentRoom
        return ( 
            <div className="character-content">
                    <div className="firstroom-content" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "cover"}}>
                    {this.state.showDirections ? 
                    <Directions closeDirections={this.closeDirections}/>
                    :null
                    }
                    
                    <div className="room-content-div">
                        {/* <div className="room-description">
                            <p>{room.description}</p>
                        </div> */}
                        <Character room={room} showCharacterChat={this.showCharacterChat} zoomState={this.state.showCharacterChat}/>
                        { room.locations.map(loc => {
                            return (
                            <div id={loc.id} onClick={this.setCurrentLocation} key={loc.id} >
                                <Location location={loc} items={loc.items} setCurrentLocation={this.setCurrentLocation}/>
                            </div>)
                        })}

                    { this.state.showZoomedLocation ? 
                    <>
                        <div className="modal-box">
                            <CurrentLocation currentLocation={this.props.currentLocation} goToRoomDetails={this.goToRoomDetails}/>
                        </div>
                        </>
                    : null}

                    
                    { this.state.numberOfLocations <= this.state.clickCount ? 
                    <>
                        <Tada>
                            <button className="next-room-btn" onClick={this.handleRoomComplete}>Go to next room</button>
                        </Tada>
                    </>
                    : null  
                    }
            </div>
            </div>
        </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        currentRoom: state.currentRoom,
        currentUser: state.currentUser,
        allRooms: state.allRooms,
        userRooms: state.userRooms,
        currentLocation: state.currentLocation
    }
}

let mapDispatchToProps = {
    setCurrentRoom: setCurrentRoom,
    setCurrentLocation: setCurrentLocation,
    setCurrentCharacter: setCurrentCharacter,
    addToUserRoom: addToUserRoom
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FirstRoom));