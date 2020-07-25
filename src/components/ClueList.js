import React, { Component } from 'react';
import {connect} from 'react-redux'
import { removeItemFromClueList } from '../actions/cluelist'
import { setClueList, setClueItems } from '../actions/cluelist'
import { withRouter } from 'react-router'

import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions.ts";
import { MenuToggle } from "./MenuToggle";
import { ClueListItems } from './ClueListItems'


function ClueList(props) {

    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 800}px at 90% 4%)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
                }
        }),
        closed: {
            clipPath: "circle(5% at 90% 3.5%)",
            transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 40
                }
            }
        }
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

        return ( 

            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}>
                <MenuToggle toggle={() => toggleOpen()} />

                <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                variants={sidebar}
                className="cluelist-container">
                    <ClueListItems />
                  </motion.div>
            </motion.nav>
);
}

let mapStateToProps = (state) => {
    return ({
        cluelistId: state.cluelistId,
        clueItems: state.clueItems,
        currentUser: state.currentUser
        })
}

let mapDispatchToProps = {
    removeItemFromClueList,
    setClueList,
    setClueItems
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClueList));