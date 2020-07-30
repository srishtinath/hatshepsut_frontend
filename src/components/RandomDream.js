import React, {useState}from 'react';

import {useSelector} from 'react-redux'
import { setCurrentRoom, setCurrentCharacter, setCurrentLocation, addToUserRoom } from '../actions/room'

const RandomDream =(props)=> {
    
    const allRooms = useSelector(state => state.allRooms)
    const room=allRooms[4]

    const completeDream = () => {
        props.goBack()
    }

        return ( 
            <div className="random-dream" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "100%"}}>
                <div className="random-dream-character" >
                    <img 
                    src={room.character.image_url} 
                    alt={room.character.name} 
                    className={room.name} />
                </div>
                <div className="dream-state-chat">
                    <p>Dream state chat will go here!</p>
                </div>

            <button onClick={completeDream} className="go-back-btn">Go back to exploring...</button>
            </div>
         );
}

 
export default RandomDream;