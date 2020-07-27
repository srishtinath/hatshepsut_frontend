import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';
import { motion, animate, cycle, useCycle } from 'framer-motion'
import { useSelector } from 'react-redux'

import Items from './Items'
import {CloseButton} from './CloseButton'

const Location = (props) => {
    let location = props.location
    const currentLocation = useSelector(state => state.currentLocation)
    const [animate, cycle] = useCycle(
        { scale: 1.0, zIndex:2, x: 0, y: 0,},
        { scale: 1.75, zIndex:6, x: "-10%", y: "2%"}
      );

    const toggleSwitch = () => setIsOn(!isOn);
    const [isOn, setIsOn] = useState(false);
    const [showItems, setShowItems] = useState(false)

    const handleClick = (e) => {
        toggleSwitch()
        props.setCurrentLocation(e)
        setShowItems(!showItems)
    }

    return ( 
        <>
            <motion.img 
            src={location.image_url} 
            alt={location.name} 
            className="location-image" 
            onClick={handleClick}
            onTap={() => cycle()}
            animate={animate} 
            style={{position: 'absolute', bottom: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            layout
            transition={{  type: "spring", stiffness: 100 }}
            
            />
            {showItems ? 
            <div className="modal-box">
                <Zoom>
                    <div className="location-items">
                        <Items items={currentLocation.items}/>
                    </div>
                </Zoom>
            </div>
            : null}
            </>
        );
}
 
export default (Location);