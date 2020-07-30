import React, {useState} from 'react';
import {motion, useAnimation} from 'framer-motion'
import { useSelector } from 'react-redux'

const CharacterIntros = () => {

    const allCharacters = useSelector(state => state.allCharacters)
    let displayCharacters = allCharacters.filter(char => char.display === true)

    const showDescription = (e, name, description) => {
        let descriptionBox = document.getElementsByClassName("char-description")[0]
        descriptionBox.innerHTML = `<h2>${name}</h2><p>${description}</p>`
    }

    const hideDescription = (e) => {
        let descriptionBox = document.getElementsByClassName("char-description")[0]
        descriptionBox.innerText = ""
    }

    return ( 
        <>
        <div className="char-container">
            <div className="char-description">
            </div>

            <div className="set-char">
        {displayCharacters.map(character => 
                <motion.div key={character.id}className="set-char-img-div">
                    <img 
                    id={character.id} 
                    src={character.image_url} 
                    alt={character.name} 
                    className="set-char-img" 
                    onMouseEnter={(e) => showDescription(e, character.name, character.description)}
                    onMouseLeave={hideDescription}
                    />
                </motion.div>
                )} 
        </div>
    </div>
    </>
    );
}
 
export default CharacterIntros;