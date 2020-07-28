import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';
import Items from './Items'

const Location = (props) => {
    let location = props.location

    const [showImages, setShowImages] = useState(false)

    const handleClick = (e) => {
        setShowImages(true)
        e.target.style.transform = "scale(1.5, 1.5)"
        e.target.style.transition = "transform 0.3s ease"
    }

    const closeImages = (e) => {
        if (e.target.className!=="location-image"){
            console.log(e.target)
            setShowImages(false)
        }
    }

    return ( 
        <>
        
            <img 
            src={location.image_url} 
            alt={location.name} 
            className="location-image" 
            onClick={handleClick}
            style={{position: 'absolute', bottom: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            
            />

            { showImages ? 
            <div className="modal-box" onClick={closeImages}>
                <Zoom>
                    <div className="location-items">
                        <Items items={location.items}/>
                    </div>
                </Zoom>
            </div>
            : null}
            </>
        );
}
 
export default (Location);