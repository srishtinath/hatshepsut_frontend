import React, { useState, useEffect } from 'react';
import Location from './Location'
import Character from './Character'
import Directions from './Directions'
import RandomDream from './RandomDream'
import QuizContainer from './QuizContainer'
import SliderGame from './SliderGame'
import MemoryGame from './MemoryGame'
import Items from './Items'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";


import { setCurrentRoom, addToUserRoom } from '../actions/room'

import Tada from 'react-reveal/Tada';

function FirstRoom(props) {


    const [showDirections, setDirections] = useState(false)
    const [showCharacterChat, setCharacterChat] = useState(false)
    const [numberOfLocations, setLocationNumber] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    const [showDream, setDream] = useState(false)
    const [handleZoom, setZoom] = useState(false)
    const [showOasis, setOasis] = useState(false)

    const dispatch = useDispatch()
    let history = useHistory()
    const currentRoom = useSelector(state => state.currentRoom)
    const currentUser = useSelector(state => state.currentUser)
    const allRooms = useSelector(state => state.allRooms)
    const userRooms = useSelector(state => state.userRooms)
    const chatHistory = useSelector(state => state.chatHistory)

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
    
    useEffect(()=> {
        // if (allRooms.indexOf(currentRoom) === 2){
        //     setOasis(true)
        // } else {
        //     setOasis(false)
        // }
        if (allRooms.indexOf(currentRoom) === 2 && chatHistory.includes("I would love for you to lead the way, Miss Hassan.")) {
            setOasis(true)
        } else {
            setOasis(false)
        }
        
    }, [chatHistory, currentRoom])

    const animateOasis = (e) => {
        console.log("Oasis was clicked")
    }

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
        props.resetClickCount()
    }

    const addUserRoomState = () => {
        fetch("http://hatshepsut.herokuapp.com/user_rooms", {
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

    
    
    const handlePotentialZoom = (e) => {
        if (e.target.className === "location-image-invisible"){
            let parentDiv = document.getElementById("room-div-to-change")
            let roomCenterX = (parentDiv.offsetWidth/2)
            let roomCenterY = (parentDiv.offsetHeight/2)
            
            let offsetX = ((roomCenterX - e.clientX)/roomCenterX * 100 * 1.75)
            let offsetY = ((roomCenterY - e.clientY)/roomCenterY * 100 * 1.75)
            controls.start({
                scale: 4,
                x: `${offsetX}%`,
                y: `${offsetY}%`,
                transition:{delay: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 60}
                })
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

    useEffect(() => {
        if (props.zoomState){
            setZoom(true)
        } else {
            setZoom(false)
        }
        // console.log(props.zoomState, "PROPS ZOOMSTATE")
    }, [props.zoomState])

    useEffect(() =>  {
        if (!handleZoom){
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
        // console.log(handleZoom, "HANDLEZOOM")
    }, [handleZoom])

    useEffect(() => {
        if (userRooms.length === 1){
            setDream(true)
            console.log("Effect recorded", userRooms.length)
        } else {
            setDream(false)
            // console.log("dream set to false")
        }
    }, [userRooms])

    const controls = useAnimation()

    const handleDreamComplete = () => {
        fetch("http://hatshepsut.herokuapp.com/user_rooms", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }, 
            body: JSON.stringify({
                user_id: currentUser.id,
                room_id: allRooms[1].id
            })
        }).then(r => r.json())
        .then((userRoomObj) => {
            setNextRoom()
            setDream(false)
        })
    }

    const [showSliderGame, setSlider]= useState(false)

    useEffect(() => {
        if (allRooms.indexOf(currentRoom) === 4){
            setSlider(true)
        } else {
            setSlider(false)
        }
    }, [currentRoom])

    const closeSlider = () => {
        setSlider(false)
    }

    const [showMemoryGame, setMemory]= useState(true)

    useEffect(() => {
        if (allRooms.indexOf(currentRoom) === 6){
            setMemory(true)
        } else {
            setMemory(false)
        }
    }, [currentRoom])

    const closeMemory = () => {
        console.log("Hello")
        setMemory(false)
    }

    const [showQuiz, setQuiz] = useState(false)

    useEffect(() => {
        if (allRooms.indexOf(currentRoom) === 7){
            setQuiz(true)
        } else {
            setQuiz(false)
        }
    }, [currentRoom])

    const closeQuiz = () => {
        setQuiz(false)
    }

    return ( 
        <div className="character-content" >
            { showDream ? 
                <RandomDream closeDream={handleDreamComplete}/>
            : 
            <motion.div id="room-div-to-change" 
            className="firstroom-content" 
            style={{backgroundImage: `url(${currentRoom.image_url})`}}
            initial={false}
            animate={controls}
            onClick={handlePotentialZoom}
            >
            
                {showDirections ? 
                <Directions closeDirections={closeDirections}/>
                :null}


                { showSliderGame ? 
                <div className="modal-box">
                    <div className="slider-container">
                        <p className="slider-intro">Congratulations! You have reached the pyramid! But it looks like there's a puzzle 
                            you need to solve before being able to get inside...Click Start to begin!</p>
                        <SliderGame  className="slider-game" closeBox={closeSlider}/>
                    </div>
                </div>
                :null}

                {showMemoryGame ?
                <div className="modal-box">
                    <div className="memory-container">
                        <MemoryGame closeMemory={closeMemory}/>
                    </div>
                </div>
                :null}

                { showQuiz ? 
                    <div className="modal-box">
                        <div className="quiz-container">
                            <QuizContainer closeQuiz={closeQuiz}/>
                        </div>
                    </div>
                :null}

                { showOasis ? 
                    <div className="oasis-box" onClick={animateOasis}>
                        This is where there's a secret oasis...
                    </div>
                    : null
                }

                <div className="room-content-div">
                    { currentRoom.locations.map(loc => {
                        return ( 
                        <div key={loc.id} > 
                            <Location location={loc} closeZoom={closeZoom} toggleItems={props.toggleItems}/> 
                            <Character room={currentRoom} showCharacterChat={showCharacterChatMethod} zoomState={showCharacterChat}/> 
                        </div>) 
                    })} 

                    { numberOfLocations <= props.clickCount ?  
                     <> 
                         <Tada>
                             <button className="next-room-btn" onClick={handleRoomComplete}>{currentRoom.id === lastRoom.id ? "Guess the culprit!" : "Go to next room!" }</button>
                         </Tada>
                     </>
                     : null  
                     }
                 </div>
             </motion.div>
             }
        </div>
    )
}


export default FirstRoom;