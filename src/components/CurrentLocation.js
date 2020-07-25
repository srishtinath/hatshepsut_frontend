import React from 'react';
import { useSelector } from 'react-redux'
import Items from './Items'

import Zoom from 'react-reveal/Zoom';
import {CloseButton} from './CloseButton'
import { motion, useCycle } from 'framer-motion';

const CurrentLocation = (props) => {
    const currentLocation = useSelector(state => state.currentLocation)
    const [animate, cycle] = useCycle(
        { scale: 1.0, zIndex:2, x: 0, y: 0, opacity: 0 },
        { scale: 1.75, zIndex:6, x: -120, y: 400.0, opacity: 1 }
      );
      
        return ( 
            <>
        <motion.img
        src={currentLocation.image_url}
        onTap={() => cycle()}
        animate={animate}
        transition={{ ease: "easeOut" }}
        className="current-location"
        >
            
        </motion.img>
            <Zoom>
                <div className="location-items">
                < Items items={currentLocation.items} />
                </div>
            </Zoom>
            <CloseButton closeBox={props.goToRoomDetails} className="close-items"/>
            </>
             );
}

export default (CurrentLocation);