import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "./CloseButton";

const Directions = (props) => {
    return ( 
        <AnimatePresence initial={false}>
        <div className="instructions-div">
            <CloseButton closeBox={props.closeDirections} className="close-directions"/>
            <motion.p key="instructions" initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}>
                  Click around to see if you can find any clues!
            </motion.p>
        </div>
        </AnimatePresence>
     );
}
 
export default Directions;