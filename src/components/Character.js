import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCharacter } from '../actions/room'

const Character = (props) => {
    const room = props.room
    const dispatch = useDispatch()
    const showCharacterChat = props.showCharacterChat

    const handleCharacterChat = (e) => {
        // console.log(this.props.currentRoom.character.id)
        fetch(`http://localhost:3000/characters/${room.character.id}`)
        .then(r => r.json())
        .then(characterFetched => {
            dispatch(setCurrentCharacter(characterFetched))
            showCharacterChat()
        }
        )
    }

    return (  
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <div className="character-div" className={room.name} onClick={handleCharacterChat}>
         <img src={room.character.image_url} alt={room.character.name} className="character-img" />
    </div> );
}
 
export default Character;