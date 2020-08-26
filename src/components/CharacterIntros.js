import React from 'react';
import {motion} from 'framer-motion'

const CharacterIntros = (props) => {

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
                {props.characters.map(character => 
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