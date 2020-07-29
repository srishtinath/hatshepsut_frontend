import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';
import Items from './Items'
// import { motion, useCycle } from 'framer-motion'


const Location = (props) => {
    let location = props.location

    const [showImages, setShowImages] = useState(false)

    const handleClick = (e) => {
        setShowImages(true)
    }

    const closeImages = (e) => {
        console.log(e.target)
        setShowImages(false)
        props.closeZoom()
    }

    // const [animate, cycle] = useCycle(
    //     { scale: 1.0, zIndex:2},
    //     { scale: 4.0, zIndex:7}
    //   );

    return ( 
        <>
            

            { !showImages ? 
            
            <img 
            src={location.image_url} 
            alt={location.name} 
            className="location-image-invisible" 
            onClick={handleClick}
            style={{position: 'absolute', top: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            />

            :
            <>
            {/* <motion.img 
            id={location.id}
            src={location.image_url} 
            alt={location.name} 
            className="location-image" 
            animate={{ scale: 2 }}
            transition={{ duration: 2 }}
            style={{position: 'absolute', top: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${8*location.size}%`}}
            /> */}

            <div className="modal-box">

                <Zoom>
                    <div className="location-items">
                        <Items items={location.items}/>
                        <button onClick={closeImages} id="close-items-btn">{'\u00D7'}</button>
                    </div>
                </Zoom>
            </div>
            </>
            }
            </>
        );
}
 
export default (Location);