import React, { useState } from 'react';

import { motion } from 'framer-motion'


const Location = (props) => {
    let location = props.location

    const toggleSwitch = () => setIsOn(!isOn);
    const [isOn, setIsOn] = useState(false);

    const handleZoom = (e) => {
        toggleSwitch()
        props.setCurrentLocation(e)
    }

    // console.log(props.location)
    return ( 
        <>
            <motion.img 
            src={location.image_url} 
            alt={location.name} 
            className="location-image" 
            onClick={handleZoom} 
            data-isOn={isOn}
            style={{position: 'absolute', bottom: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            layout
            transition={{ ease: "easeOut" }}
            />

            </>
        );
}
 
export default (Location);