import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';
import { motion, useCycle } from 'framer-motion'
import Items from './Items'

const Location = (props) => {
    let location = props.location
    const [animate, cycle] = useCycle(
        { scale: 1.0, zIndex:2, x: 0, y: 0,},
        { scale: 1.75, zIndex:6, x: "-10%", y: "2%"}
      );

    const toggleSwitch = () => setIsOn(!isOn);
    const [isOn, setIsOn] = useState(false);
    const [showItems, setShowItems] = useState(false)

    const handleClick = (e) => {
        // console.log(e.target.id)
        if (e.target.className === "location-image" && !showItems){
            toggleSwitch()
            props.setCurrentLocation(e.target.id)
            setShowItems(!showItems)
        } else {
            toggleSwitch()
            setShowItems(!showItems)
        }
    }

    return ( 
        <>
            <motion.img 
            id={location.id}
            src={location.image_url} 
            alt={location.name} 
            className="location-image" 
            onClick={handleClick}
            onTap={()=> cycle()}
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
                        <Items items={location.items}/>
                    </div>
                </Zoom>
            </div>
            : null}
            </>
        );
}
 
export default (Location);