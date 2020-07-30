import React from 'react';
import { motion, useCycle } from "framer-motion";
import { CloseButton } from "./CloseButton";

const Directions = (props) => {
      
    const target = {
        scale: [1, 1.15, 1],
        transition: {
            loop: Infinity,
            ease: "easeOut",
            duration: 1.75
          }
    }

    return ( 
        <div>
            <button onClick={props.closeDirections} className="close-directions">Close directions!</button>

            <motion.div className="indicate-progress" animate={target} >
                <p>This bar will show your progress through the story!</p>

                <svg id="more-arrows">
                    <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
                    <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
                    <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
                </svg>
            </motion.div>
            <motion.div className="instructions-div" animate={target}>
                <p key="instructions">
                    Click around to see if you can find any clues!
                </p>
            </motion.div>
            <motion.div className="indicate-cluelist" animate={target}>
                Click on this menu to see all the clues you've added to the Notepad!
            </motion.div>
        </div>
     );
}
 
export default Directions;