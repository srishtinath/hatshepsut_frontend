import * as React from "react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux'

// import { MenuItem } from "./MenuItem";

// const result: any = useSelector(selector: Function, equalityFn?: Function)
const guessCulprit = (e) => {
    this.props.history.push('/guess')
}

const renderHome = (e) => {
    this.props.history.push('/home')
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const handleRemoveFromNotepad = (item) => {
    let entryId = this.props.cluelistId
        fetch(`http://localhost:3000/clue_lists/${entryId}/deleteItem/${item.id}`, {
            method: "DELETE",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            }
        })
        .then(r => r.json())
        .then(resp => {
            console.log(resp)
            this.props.removeItemFromClueList(item)
        })
    }
    
const livariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
        y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
        y: { stiffness: 1000 }
        }
    }
    }; 
export const ClueListItems = (props) => (
    <>
    <motion.ul variants={variants} className="cluelist-ul">
        {/* {this.props.clueItems.map(item => {
        return <li key={item.id}>{item.name}
                <button onClick={(event) => handleRemoveFromNotepad(item)} >{'\u00D7'}</button>
            </li>
    })} */}
        <motion.li
        variants={livariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}>Where is this line?
        </motion.li>
    </motion.ul>
    <button className="guess-culprit-btn" onClick={guessCulprit}>Guess the culprit!</button>
    <br></br>
    <button className="go-home-btn" onClick={renderHome}>Home</button>
    </>
);
