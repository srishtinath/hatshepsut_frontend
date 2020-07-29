import React, { useState, useEffect } from 'react';
import Location from './Location'
import Character from './Character'
import Directions from './Directions'
// import RandomDream from './RandomDream'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { setCurrentRoom, setCurrentCharacter, addToUserRoom } from '../actions/room'

import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';

import {CSSTransition} from 'react-transition-group'


function FirstRoom(props) {

    const [showDirections, setDirections] = useState(true)
    const [showCharacterChat, setCharacterChat] = useState(false)
    const [numberOfLocations, setLocationNumber] = useState(0)
    const [clickCount, setClickCount] = useState(0)

    let dispatch = useDispatch()
    let history = useHistory()
    const currentRoom = useSelector(state => state.currentRoom)
    const currentUser = useSelector(state => state.currentUser)
    const allRooms = useSelector(state => state.allRooms)
    const userRooms = useSelector(state => state.userRooms)

    useEffect(()=>{
        setLocationNumber(currentRoom.locations.length)
    }, [currentRoom.locations.length])

    useEffect(() => {
        setDirections(false)
    }, [currentUser.user_rooms])

    useEffect(() => {
        setClickCount(0)
    }, [currentRoom])

    const showCharacterChatMethod = (e) => {setCharacterChat(!showCharacterChat)}

    const closeDirections = () => {setDirections(!showDirections)}

    const handleRoomComplete = (e) => {
        let allRoomIds = userRooms.map(roomObj => roomObj.room_id)
        if (!allRoomIds.includes(currentRoom.id)){
            addToUserRoom()
        } else {
            setNextRoom()
        }
        if (e.target.innerText === "Guess the culprit!"){
            history.push('/guess')
        }
    }

    const addToUserRoom = () => {
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
        .then(userRoomObj => {
            dispatch(addToUserRoom(userRoomObj))
            setNextRoom()
        })
    }

    const setNextRoom = () => {
        let filteredRooms = allRooms.filter(room => room.display === true)
        let currentRoomId = filteredRooms.indexOf(currentRoom)
        let nextRoomObj = filteredRooms[currentRoomId + 1]
        if (nextRoomObj){
            dispatch(setCurrentRoom(nextRoomObj))
        }
    }


    const handlePotentialZoom = (e) => {
        let parentDiv = document.getElementById("room-div-to-change-img")
        // let characterObj = document.getElementById("character-image")

        if (e.target.className === "location-image-invisible"){
            let roomCenterX = (parentDiv.width/2)
            let roomCenterY = (parentDiv.height/2)
            let offsetX = (roomCenterX - e.clientX) 
            let offsetY = (roomCenterY - e.clientY) 

            if (offsetX > 600){
                offsetX = 600
            }
            if (offsetX < -600){
                offsetX = -600
            }
            if (offsetY > 300){
                offsetY = 300
            }
            if (offsetY < -300){
                offsetY = -300
            }
            
            console.log(offsetX, offsetY)
            parentDiv.style.transform = `scale(6,6) translateX(${offsetX}px) translateY(${offsetY}px)`
            parentDiv.style.transition = "all 0.6s 0.2s"

            // locationItems.forEach(locationImg => {
            //     if (locationImg.id !== e.target.id){
            //         let originalX = (locationImg.offsetLeft - e.clientX) * 8
            //         let originalY = (locationImg.offsetTop - e.clientY) * 8
            //         console.log(originalY, originalX)
            //         locationImg.style.transform = `translateX(${originalX}px) translateY(${originalY}px)`
            //         locationImg.style.transition = "transform 0.3s ease"
            //     } else {
            //         locationImg.style.transform = `scale(${number})`
            //         locationImg.style.transition = "transform 0.3s ease"
            //     }
            // })

            // characterObj.style.transform = `scale(8,8) translateX(${offsetX}%) translateY(${offsetY}%)`
            // characterObj.style.transition = "transform 0.6s ease"
        } 
    }

    const closeZoom = (e) => {
        let parentDiv = document.getElementById("room-div-to-change-img")
        let characterObj = document.getElementById("character-image")

        parentDiv.style.transform = "scale(1, 1) translateX(0px) translateY(0px)"
        parentDiv.style.transition = "transform 0.6 0.2s"
        characterObj.style.transform = "scale(1, 1) translateX(0px) translateY(0px)"
        characterObj.style.transition = "all 0.6 ease"
        
        setClickCount(clickCount + 1)
    }

    const lastRoom = allRooms[allRooms.length-1]
        
    return ( 
            
        <div className="character-content" onClick={handlePotentialZoom}>
                {/* <Zoom> */}
                
                <div id="room-div-to-change" className="firstroom-content" >
                
                {/* <CSSTransition> */}
                    <img id="room-div-to-change-img" src={currentRoom.image_url} alt={currentRoom.name} key="background-image"/>
                {/* </CSSTransition> */}

                {showDirections ? 
                <Directions closeDirections={closeDirections}/>
                :null
                }
                
                <div className="room-content-div">
                    { currentRoom.locations.map(loc => {
                        return (
                        <div key={loc.id} >
                            <Location location={loc} closeZoom={closeZoom}/>
                            <Character room={currentRoom} showCharacterChat={showCharacterChatMethod} zoomState={showCharacterChat}/>
                        </div>)
                    })}

                { (numberOfLocations) <= (clickCount) ? 
                <>
                    <Tada>
                        <button className="next-room-btn" onClick={handleRoomComplete}>{currentRoom.id === lastRoom.id ? "Guess the culprit!" : "Go to next room!" }</button>
                    </Tada>
                </>
                : null  
                }
                </div>
        </div>
        {/* </Zoom> */}
    </div>)
}


export default FirstRoom;