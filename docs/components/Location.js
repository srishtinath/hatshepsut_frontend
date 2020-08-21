import React from 'react';
import {  useDispatch} from 'react-redux'
import { setCurrentLocation } from '../actions/room'



const Location = (props) => {
    let location = props.location
    let dispatch = useDispatch()
    
    const handleClick = (e) => {
        props.toggleItems()
        dispatch(setCurrentLocation(location))
    }

    return ( 
        <>
            
            <img 
            src={location.image_url} 
            alt={location.name} 
            className="location-image-invisible" 
            onClick={handleClick}
            style={{position: 'absolute', top: `${location.positionY}%`, 
            left: `${location.positionX}%`, maxWidth: `${location.size}%`}}
            />
            </>
        );
}
 
export default Location;