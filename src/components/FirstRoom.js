import React, { useState, useEffect } from 'react';
import Location from './Location'
import Character from './Character'
import Directions from './Directions'
import RandomDream from './RandomDream'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";


import { setCurrentRoom, setCurrentCharacter, addToUserRoom } from '../actions/room'

import Tada from 'react-reveal/Tada';


function FirstRoom(props) {


    const [showDirections, setDirections] = useState(true)
    const [showCharacterChat, setCharacterChat] = useState(false)
    const [numberOfLocations, setLocationNumber] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [showDream, setDream] = useState(false)
    const [scale, setScale] = useState(1)

    const dispatch = useDispatch()
    let history = useHistory()
    const currentRoom = useSelector(state => state.currentRoom)
    const currentUser = useSelector(state => state.currentUser)
    const allRooms = useSelector(state => state.allRooms)
    const userRooms = useSelector(state => state.userRooms)
    

    useEffect(() => {
        if (!currentUser.user_rooms){
            setDirections(true)
        }

        let parentDiv = document.getElementById("room-div-to-change")
        let roomCenterX = (parentDiv.offsetWidth/2)
        let roomCenterY = (parentDiv.offsetHeight/2)
        setOffsetX(roomCenterX)
        setOffsetY(roomCenterY)
        setScale(1)
    }, [])

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
        console.log(userRooms.length)
        let allRoomIds = userRooms.map(roomObj => roomObj.room_id)
        if (!allRoomIds.includes(currentRoom.id)){
            addUserRoomState()
        } else {
            setNextRoom()
        }
        if (e.target.innerText === "Guess the culprit!"){
            history.push('/guess')
        }
    }

    const addUserRoomState = () => {
        fetch("http://localhost:3000/user_rooms", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }, 
            body: JSON.stringify({
                user_id: currentUser.id,
                room_id: currentRoom.id
            })
        }).then(r => r.json())
        .then((userRoomObj) => {
            dispatch(addToUserRoom(userRoomObj))
        })
        setNextRoom()

    }

    const setNextRoom = () => {
        let filteredRooms = allRooms.filter(room => room.display === true)
        let currentRoomId = filteredRooms.indexOf(currentRoom)
        let nextRoomObj = filteredRooms[currentRoomId + 1]
        if (nextRoomObj){
            dispatch(setCurrentRoom(nextRoomObj))
        }
    }

    const closeZoom = (e) => {
        setClickCount(clickCount + 1)
    }

    const lastRoom = allRooms[allRooms.length-1]

    
    const [clickX, setClickX] = useState(0)
    const [clickY, setClickY] = useState(0)

    // useEffect((e) => {
    //     console.log(e.clientX, e.clientY )
    // }, [clickX, clickY])
    
    
    
    const handlePotentialZoom = (e) => {
        if (e.target.className === "location-image-invisible"){
            console.log(offsetX, offsetY)
            setClickX(e.clientX)
            setClickY(e.clientY)
        } else if (e.target.id === "close-items-btn"){
            controls.start({
                scale: 1,
                x: 0,
                y: 0,
                transition:{delay: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 40}
            })
        }
    }

    useEffect(()=> {
        let parentDiv = document.getElementById("room-div-to-change")
        let roomCenterX = (parentDiv.offsetWidth/2)
        let roomCenterY = (parentDiv.offsetHeight/2)
        console.log(roomCenterX, roomCenterY)
        console.log(clickX, clickY )
        setOffsetX((roomCenterX - clickX)/roomCenterX * 100 * 1.75)
        setOffsetY((roomCenterY - clickY)/roomCenterY * 100 * 1.75)
        setScale(4)
    }, [clickX, clickY])


    useEffect(()=> {
        controls.start({
            // scale: scale,
            // x: `${offsetX}%`,
            // y: `${offsetY}%`,
            transition:{delay: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 40}
            })
            console.log(offsetX, offsetY)
    }, [clickX, clickY])

    useEffect(() => {
        if (currentUser.user_rooms === 2){
            setDream(true)
        } else (
            setDream(false)
        )
    }, [currentUser.user_rooms])


    const controls = useAnimation()

    return ( 
        <div className="character-content" >
        { showDream ? 
            <RandomDream />
            : 
                <>
                <motion.div id="room-div-to-change" 
                className="firstroom-content" 
                style={{backgroundImage: `url(${currentRoom.image_url})`}}
                initial={false}
                animate={controls}
                onClick={handlePotentialZoom}
                >
                

                {showDirections ? 
                <Directions closeDirections={closeDirections}/>
                :null
                }
                
                <div className="room-content-div">
                    { currentRoom.locations.map(loc => {
                        return (
                        <div key={loc.id} >
                            <Location location={loc} closeZoom={closeZoom} offsetX={offsetX} offsetY={offsetY}/>
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
        </motion.div>
        </>
        }

    </div>)
}


export default FirstRoom;