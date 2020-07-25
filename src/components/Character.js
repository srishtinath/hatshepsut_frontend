import React from 'react';
import CharacterChat from '../components/CharacterChat'
import { useState } from "react";

import { useDispatch } from 'react-redux';
import { setCurrentCharacter } from '../actions/room'
import { motion, useCycle } from 'framer-motion'


const Character = (props) => {
    const room = props.room
    const dispatch = useDispatch()
    const showCharacterChat = props.showCharacterChat
    const zoomState = props.zoomState

    const handleCharacterChat = (e) => {
        console.log(e.target.classList)

        if (!zoomState){
            fetch(`http://localhost:3000/characters/${room.character.id}`)
            .then(r => r.json())
            .then(characterFetched => {
                dispatch(setCurrentCharacter(characterFetched))
                showCharacterChat()
            })
        } else {
            showCharacterChat()
        }
    }

    const [animate, cycle] = useCycle(
        { scale: 1.0, zIndex:2, x: 0, y: 0 },
        { scale: 1.75, zIndex:7, x: -120, y: 400.0 }
      );


    return (  
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <>
         <motion.img
         src={room.character.image_url} 
         alt={room.character.name} 
         className={room.name} 
         onClick={handleCharacterChat}
         onTap={() => cycle()}
         animate={animate}
         transition={{ ease: "easeOut" }}
         />

         { zoomState ? 
            <>
            <div className="modal-box">
                <CharacterChat room={room} toggleRoom={handleCharacterChat}/>
            </div>
            </>
            : null}
        </>
    )
}
 
export default Character;