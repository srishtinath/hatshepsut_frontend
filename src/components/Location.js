import React from 'react';
import { useDispatch} from 'react-redux'
import { setCurrentLocation } from '../actions/room'
import { useState } from 'react'



const Location = (props) => {
    let location = props.location
    let dispatch = useDispatch()
    
    const [showImage, setImage] = useState(false)

    const handleClick = (e) => {
        props.toggleItems()
        setImage(true)
        dispatch(setCurrentLocation(location))
    }

    return ( 
        <>
            
            <img 
            src={location.image_url} 
            alt={location.name} 
            className={showImage? "location-image" : "location-image-invisible" }
            onClick={handleClick}
            style={{position: 'absolute', top: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            />
            </>
        );
}
 
export default Location;