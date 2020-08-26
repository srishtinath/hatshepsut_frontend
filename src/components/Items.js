import React from 'react';
import {useSelector} from 'react-redux'
import Item from './Item'


const Items = () => {

    const currentLocation = useSelector(state => state.currentLocation)
    const items = currentLocation.items
   
    console.log(items.length > 1)
        return ( 
            <>
            {/* <p align="center">{currentLocation.name}</p> */}
            {items.length > 0 ? 
            <div className="item-container">
            {items.map(item => 
                < Item item = {item} key={item.id}/>
                )}
            </div>
            :
            <div className="item-container">
                <p align="center">Looks like there are no clues here!</p>
            </div> 
            }
            </>
         );
}
 
export default Items;