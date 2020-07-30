import React, { useState, useEffect } from 'react';
import Location from './Location'
import Character from './Character'
import Directions from './Directions'
import RandomDream from './RandomDream'
import QuizContainer from './QuizContainer'
import SliderGame from './SliderGame'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";


import { setCurrentRoom, setCurrentCharacter, addToUserRoom } from '../actions/room'

import Tada from 'react-reveal/Tada';
import { CloseButton } from './CloseButton';


function FirstRoom(props) {


    const [showDirections, setDirections] = useState(false)
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
    

    // useEffect(() => {
    //     let parentDiv = document.getElementById("room-div-to-change")
    //     let roomCenterX = (parentDiv.offsetWidth/2)
    //     let roomCenterY = (parentDiv.offsetHeight/2)
    //     setOffsetX(roomCenterX)
    //     setOffsetY(roomCenterY)
    //     setScale(1)
    // }, [])

    useEffect(()=>{
        setLocationNumber(currentRoom.locations.length)
    }, [currentRoom.locations.length])

    useEffect(() => {
        setClickCount(0)
    }, [currentRoom])

    const showCharacterChatMethod = (e) => {setCharacterChat(!showCharacterChat)}

    const closeDirections = () => {setDirections(false)}

    useEffect(() => {
        if(userRooms.length === 0){
            setDirections(true)
        }
    }, [])

    useEffect(() => {
        if(clickCount > 1){
            setDirections(false)
        }
    }, [clickCount])
    

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
            // console.log(offsetX, offsetY)
            setClickX(e.clientX)
            setClickY(e.clientY)
            setOffsets()
        } else if (e.target.id === "close-items-btn"){
            controls.start({
                scale: 1,
                x: 0,
                y: 0,
                transition:{
                    type: "spring",
                    stiffness: 400,
                    damping: 60}
            })
        }
    }

    function setOffsets(){
        let parentDiv = document.getElementById("room-div-to-change")
        let roomCenterX = (parentDiv.offsetWidth/2)
        let roomCenterY = (parentDiv.offsetHeight/2)
        console.log(roomCenterX, roomCenterY)
        console.log(clickX, clickY )
        setOffsetX((roomCenterX - clickX)/roomCenterX * 100 * 1.75)
        setOffsetY((roomCenterY - clickY)/roomCenterY * 100 * 1.75)
        setScale(4)
    }


    useEffect(()=> {
        controls.start({
            scale: scale,
            x: `${offsetX}%`,
            y: `${offsetY}%`,
            transition:{delay: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 60}
            })
            console.log(offsetX, offsetY)
    }, [offsetX, offsetY, scale])

    useEffect(() => {
        if (userRooms.length === 1){
            setDream(true)
            console.log("Effect recorded", userRooms.length)
        } else {
            setDream(false)
            console.log("dream set to false")
        }
    }, [userRooms])

    const controls = useAnimation()

    const handleDreamComplete = () => {
        fetch("http://localhost:3000/user_rooms", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }, 
            body: JSON.stringify({
                user_id: currentUser.id,
                room_id: allRooms[4].id
            })
        }).then(r => r.json())
        .then((userRoomObj) => {
            setNextRoom()
            setDream(false)
        })
    }

    const [showQuiz, setQuiz] = useState(false)

    // useEffect(() => {
    //     if (allRooms.indexOf(currentRoom) === 2){
    //         setQuiz(true)
    //     } else {
    //         setQuiz(false)
    //     }
    // }, [currentRoom])

    const closeQuiz = () => {
        setQuiz(false)
    }

    const [showSliderGame, setSlider]= useState(false)

    useEffect(() => {
        if (allRooms.indexOf(currentRoom) === 3){
            setSlider(true)
        } else {
            setSlider(false)
        }
    }, [currentRoom])

    const closeSlider = () => {
        setSlider(false)
    }

    const [showMemoryGame, setMemory]= useState(false)
    return ( 
        <div className="character-content" >
            { showDream ? 
                <RandomDream closeDream={handleDreamComplete}/>
            : 
            <>
            <motion.div id="room-div-to-change" 
            className="firstroom-content" 
            style={{backgroundImage: `url(${currentRoom.image_url})`}}
            initial={false}
            animate={controls}
            onClick={handlePotentialZoom}
            >
            
            { showQuiz? 
                <QuizContainer closeQuiz={closeQuiz}/>
            :null}
                {showDirections ? 
                <Directions closeDirections={closeDirections}/>
                :null}

                { showSliderGame ? 
                <div className="modal-box">
                    <div className="slider-container">
                        <CloseButton closeBox={closeSlider}/>
                        <SliderGame  className="slider-game"/>
                    </div>
                </div>
                :null}

                {/* {showMemoryGame ? 
                <MemoryGame />
                :null} */}
                    
                <div className="room-content-div">
                    { currentRoom.locations.map(loc => {
                        return (
                        <div key={loc.id} >
                            <Location location={loc} closeZoom={closeZoom} offsetX={offsetX} offsetY={offsetY}/>
                            <Character room={currentRoom} showCharacterChat={showCharacterChatMethod} zoomState={showCharacterChat}/>
                        </div>)
                    })}

                    { numberOfLocations <= clickCount ? 
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
        </div>
    )
}


export default FirstRoom;