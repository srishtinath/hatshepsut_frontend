import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { setCurrentRoom } from '../actions/room' 

export const Rooms = () => {
let history = useHistory()
const dispatch = useDispatch()
let allRooms = useSelector(state => state.allRooms)
let userRooms = useSelector(state => state.userRooms)

    const goToRoom = (roomObj) => {
        dispatch(setCurrentRoom(roomObj))
        history.push('/hatshepsut_frontend/home/room')
    } 

    const guessCulprit = (e) => {
        history.push('/hatshepsut_frontend/guess')
    }

    const list = {
        hidden: {     
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        visible: {
            transition: { staggerChildren: 0.1, staggerDirection: 1 }
        }
    }

    const completeitem = {
        hidden: {
            y: 100,
            opacity: 0,
            transition: {
            y: { stiffness: 1000, velocity: -100 }
            }
        },
        visible: {
            y: 0,
            opacity: 0.4,
            transition: {
            y: { stiffness: 1000 }
            }
        }
    }
    const incompleteitem = {
        hidden: {
            y: 100,
            opacity: 0,
            transition: {
            y: { stiffness: 1000, velocity: -100 }
            }
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
            y: { stiffness: 1000 }
            }
        }
    }

    const filteredRooms = allRooms.filter(room => room.display === true)
        return ( 
        <div className="room-index">
            <h2 align="center">Explore</h2>
            <motion.div
            initial="hidden"
            animate="visible"
            variants={list}
            >
        {filteredRooms.map(room => 
            <div key={room.id} className="room-index-img" onClick={() => goToRoom(room)}>  
                { Boolean(userRooms.find(userRoom => userRoom.room_id === room.id)) ? 
                <motion.div variants = {completeitem} style={{backgroundImage: `url(${room.image_url})`, backgroundPosition: "center center"}} className="room-complete">
                    <p>{room.description} </p>
                </motion.div>
                :
                <motion.div variants = {incompleteitem} style={{backgroundImage: `url(${room.image_url})`, backgroundPosition: "center center"}} className="room-incomplete">
                    <p>{room.description}</p>
                </motion.div>
            }
            </div>

            )}
            </motion.div>
            {userRooms.length === allRooms.length ? 
            <button className="guess-culprit" onClick={guessCulprit}>Guess the culprit!</button>
            : null}
        </div> 
        );
}