import React, { Component } from 'react';
import Location from './Location'
import Character from './Character'
import Directions from './Directions'
// import RandomDream from './RandomDream'

import { connect } from 'react-redux'
import { setCurrentRoom, setCurrentCharacter, addToUserRoom } from '../actions/room'
import { withRouter } from 'react-router'

import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';


class FirstRoom extends Component {

    state = {
        showDirections: true,
        showImages: false,
        showCharacterChat: false,
        numberOfLocations: 0,
        clickCount: 0,
    }

    componentDidMount(){
        this.setState({
            numberOfLocations: this.props.currentRoom.locations.length
        })
        if (this.props.currentUser.user_rooms.length){
            this.setState({
                showDirections: !this.state.showDirections
            })
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.currentRoom !== prevProps.currentRoom){
            this.setState({
                clickCount: 0,
                numberOfLocations: this.props.currentRoom.locations.length,
            })
        }
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
        let allRoomIds = this.props.userRooms.map(roomObj => roomObj.room_id)
        if (!allRoomIds.includes(this.props.currentRoom.id)){
            this.addToUserRoom()
        } else {
            this.setNextRoom()
        }
        if (e.target.innerText === "Guess the culprit!"){
            this.props.history.push('/guess')
        }
    }

    addToUserRoom = () => {
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
            this.setNextRoom()
    }

    setNextRoom = () => {
        let filteredRooms = this.props.allRooms.filter(room => room.display === true)
        let currentRoomId = filteredRooms.indexOf(this.props.currentRoom)
        let nextRoomObj = filteredRooms[currentRoomId + 1]
        if (nextRoomObj){
            this.props.setCurrentRoom(nextRoomObj)
        }
    }

    handlePotentialZoom = (e) => {
        let parentDiv = document.getElementById("room-div-to-change-img")
        let locationItems = Array.from(document.getElementsByClassName("location-image"))
        console.log(parentDiv.className)
        if (e.target.className === "location-image"){
            let closeButton = document.getElementById("close-items-btn")
            closeButton.style.opacity = 1
            let imageOffset_x = e.clientX * 0.6;
            let imageOffset_y = e.clientY * 0.6;
            parentDiv.style.transform = `scale(8,8) translateX(${-imageOffset_x}px) translateY(${-imageOffset_y}px)`
            parentDiv.style.transition = "transform 0.6s ease"

            locationItems.forEach(locationImg => {
                locationImg.style.transform = `scale(8,8) translateX(${-imageOffset_x}px) translateY(${-imageOffset_y}px)`
                locationImg.style.transition = "transform 0.6s ease"
            })

            console.log(locationItems)
            this.setState({
                showImages: true
            })
        } 
    }

    closeDirections = (e) => {
        let parentDiv = document.getElementById("room-div-to-change-img")
        let locationItems = Array.from(document.getElementsByClassName("location-image"))

        console.log(locationItems)
        parentDiv.style.transform = "scale(1, 1) translateX(0px) translateY(0px)"
        parentDiv.style.transition = "transform 0.6 ease"
        locationItems.forEach(locationImg => {
            locationImg.style.transform = "scale(1, 1) translateX(0px) translateY(0px)"
            locationImg.style.transition = "transform 0.6 ease"
        })
        let closeButton = document.getElementById("close-items-btn")
        this.setState({
            clickCount: this.state.clickCount + 1
        })
        closeButton.style.opacity = 0
    }

    render() 
    { 
        let room = this.props.currentRoom
        let lastRoom = this.props.allRooms[this.props.allRooms.length-1]
        return ( 
            
            <div className="character-content" onClick={this.handlePotentialZoom}>
                    <Zoom>
                    <div id="room-div-to-change" className="firstroom-content" >
                    <img id="room-div-to-change-img" src={room.image_url} alt={room.name}/>
                    {this.state.showDirections ? 
                    <Directions closeDirections={this.closeDirections}/>
                    :null
                    }
                    
                    <div className="room-content-div">
                        <Character room={room} showCharacterChat={this.showCharacterChat} zoomState={this.state.showCharacterChat}/>
                        { room.locations.map(loc => {
                            return (
                            <div id={loc.id} key={loc.id} >
                                <Location location={loc}/>
                                <button onClick={this.closeDirections} id="close-items-btn">{'\u00D7'}</button>
                            </div>)
                        })}
                    { (this.state.numberOfLocations) <= (this.state.clickCount) ? 
                    <>
                        <Tada>
                    <button className="next-room-btn" onClick={this.handleRoomComplete}>{room.id === lastRoom.id ? "Guess the culprit!" : "Go to next room!" }</button>
                        </Tada>
                    </>
                    : null  
                    }
            </div>
            </div>
            </Zoom>
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
    setCurrentCharacter: setCurrentCharacter,
    addToUserRoom: addToUserRoom
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FirstRoom));