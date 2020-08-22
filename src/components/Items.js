import React from 'react';
import {useSelector} from 'react-redux'
import Item from './Item'


const Items = () => {

    const currentLocation = useSelector(state => state.currentLocation)
    const items = currentLocation.items
   
        return ( 
            <>
            {/* <p align="center">{currentLocation.name}</p> */}
            {items ? 
            <div className="item-container">
            {items.map(item => 
                < Item item = {item} key={item.id}/>
                )}
            </div>
            : null}
            </>
         );
}
 
export default Items;