import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';
import Items from './Items'

const Location = (props) => {
    let location = props.location

    const [showImages, setShowImages] = useState(false)

    const handleClick = (e) => {
        setShowImages(true)
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

            { showImages && props.showImages ? 
            // <div className="modal-box" onClick={closeImages}>
                <Zoom>
                    <div className="location-items"  onClick={closeImages}>
                        <Items items={location.items}/>
                    </div>
                </Zoom>
            // </div>
            : null}
            </>
        );
}
 
export default (Location);